const express = require('express');
const app = express();
const PORT = 3000;

// DB共通モジュールをインポート
const { executeQuery, closePool } = require('./db');

// ミドルウェアでJSON形式のリクエストボディを自動的にパース
app.use(express.json());

// サーバーエラーを処理する共通関数
function handleServerError(res, error, message = 'サーバーエラー') {
    console.error(error);
    res.status(500).json({ error: message });
}

//　ユーザーの作成(Create)
app.post('/users', async(req, res) => {
    const { name, age } = req.body;
    try{ // INSERT文を実行し、結果をJSON形式で取得
        const result = await executeQuery(
            'INSERT INTO users (name, age) VALUES (?, ?);',
            [name, age]
        );
        // エラーがなければ成功とみなし、201 Createdとデータ情報を返す
        res.status(201).json({ id: result.insertId, name, age });
    } catch (error) {
        handleServerError(req, error, `ユーザー追加に失敗しました。`);
    }
});

// ユーザーリストの読み取り(Read)
app.get('/users', async (req, res) => {
    try{
        const rows = await executeQuery('SELECT * FROM users;');
        // ユーザーリストがからでも異常とは言い切れないため、エラーがなければ200 OKを返却
        res.status(200).json(rows);
    } catch (error) {
        handleServerError(res, error);
    }
});

// 単一ユーザーの読み取り(Read)
app.get('/users/:id', async( req, res) => {
    try{
        const rows = await executeQuery('SELECT * FROM users WHERE id = ?;', [req.params.id]);

        // 指定IDのユーザーが存在しない(行数0)なら404 Not Foundを返却
        rows.length === 0
            ? res.status(404).json({ error: `ユーザーが見つかりません。`})
            : res.status(200).json( rows[0] );
    } catch (error) {
        handleServerError(res, error);
    }
});

// ユーザーの更新(Update)
app.put('/users/:id', async( req, res ) => {
    const { name, age } = req.body;
    try {
        const result = await executeQuery(
            'UPDATE users SET name = ?, age = ? WHERE id = ?;',
            [name, age, req.params.id]
        );

        // 1行も更新されていなければ404 Not Foundを返却
        result.affectedRows === 0
            ? res.status(404).json({ error: `更新対象のユーザーが見つかりません。`})
            : res.status(200).json({ id: req.params.id, name, age});
    } catch (error) {
        handleServerError(res, error, `ユーザー更新に失敗しました。`);
    }
});

// ユーザーの削除(Delete)
app.delete('/users/:id', async(req, res) => {
    try{ // Delete文を実行し、結果をJSON形式で取得
        const result = await executeQuery(
            'DELETE FROM users WHERE id = ?;',
            [req.params.id]
        );

        // 1行も削除されていなければ404 Not Foundを返却
        result.affectedRows === 0
            ? res.status(404).json({ error: '削除対象のユーザーが見つかりません。'})
            : res.status(200).json({ message: 'ユーザーを削除しました'});
    } catch (error) {
        handleServerError(res, error, 'ユーザー削除に失敗しました。');
    }
});

// アプリ終了時にDB接続プールを安全に破棄する
['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(signal => {
    process.on(signal, async() => {
        console.log(`\n${signal}を受信。アプリケーションの終了処理中...`);
        await closePool();
        process.exit();
    });
});

// Webサーバーを起動
app.listen(PORT, () => {
    console.log(`${PORT}番ポートでWebサーバーが起動しました。`);
});