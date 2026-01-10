//////////////////////////////////////
// ユーザーの登録・認証を行うモジュール
///////////////////////////////////////

const express = require('express');

const { executeQuery } = require('./db'); //SQL文の実行
const jwt = require('./jwt'); // JWT共通モジュール
const bcrypt = require('bcrypt'); // bcrypt

// ルーティング操作用オブジェクトを生成
const router = express.Router();

// ユーザー登録
router.post('/register', async (req, res) => {
    // ユーザー名とパスワードをリクエストから取得
    const { username, password } = req.body;

    try {
        // パスワードをハッシュ化
        const hashed = await bcrypt.hash(password, 10);

        // ユーザー名とハッシュ化したパスワードをもとにデータを追加
        await executeQuery(
            'INSERT INTO auth_users (username, password) VALUES (?, ?);',
            [username, hashed]
        );

        // ユーザー登録成功
        res.status(201).json({ message: 'ユーザー登録に成功しました。' });
    } catch (error) {
        if(error.code === 'ER_DUP_ENTRY'){ //データ重複エラー
            res.status(409).json({ message: 'そのユーザー名は既に存在します。' });
        }else {
            res.status(500).json({ message: 'データベースエラーが発生しました。' });
        }
    }
});

// ログイン
router.post('/login', async(req,res) => {
    // ユーザー名とパスワードをリクエストから取得
    const { username, password } = req.body;

    try {
        // 送信されたユーザー名のデータを検索
        const [rows] = await executeQuery(
            'SELECT * FROM auth_users WHERE username = ?;',
            [username]
        );

        // 取得データが１件の場合、rowsは配列ではなくオブジェクト扱いになる
        // ユーザー名が一致するデータは1件だけのため、オブジェクトとして使える

        // 認証失敗(ユーザー未登録またはパスワード不一致)
        if(!rows || !(await bcrypt.compare(password, rows.password))){
            return res.status(401).json({ message: 'ユーザー名またはパスワードが間違っています。' });
        }

        // 成功時はトークンを生成
        const token = jwt.generateToken({ id: rows.id, username: rows.username });

        // トークンをクッキーに保存(ブラウザへ指示出し)
        res.cookie('authToken', token, {
            httpOnly: true, //JavaScriptからのアクセスを禁止(XSS対策)
            secure: true, // 暗号化されたHTTPSでのみ送信(盗聴リスク低減)
            sameSite: 'strict', // 別サイトからのリクエスト時にクッキーを送信しない(CSRF対策)
            maxAge: 60 * 60 * 1000, //有効期限(1時間)
        });

        // ステータスコードのみ返却(トークンはクッキー経由で返却)
        return res.status(200).json({ message: 'ログイン成功' });
    } catch (error) {
        res.status(500).json({ error: 'データベースエラーが発生しました' });
    }
});

// ログイン済みユーザー自身の情報を取得
router.get('/my-info', jwt.verifyToken, (req, res) => {
    // トークン検証OKならユーザーデータ返却
    res.json({ id: req.body.id, username: req.body.username });
});


// モジュールとしてエクスポート
module.exports = router;
