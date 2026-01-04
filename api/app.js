// expressモジュールを取り込む
const express = require('express');

// Webサーバーの土台を作成
const app = express();

// ユーザーリスト
const users = [
    {id: 1, name: '侍太郎', age: 28},
    {id: 2, name: '侍花子', age: 32}, 
    {id: 3, name: '侍一郎', age: 24}, 
];

// 全ユーザーのデータを取得
app.get('/users', (req, res) => {
    // ユーザーをJSON形式に変換して出力
    res.json(users);
});

// IDで指定したユーザーのデータを取得
app.get('/users/:id', (req, res) => {
    // ユーザーリストから、リクエストのIDと一致するデータを検索
    const user = users.find(u => u.id === parseInt(req.params.id));

    if(user){ // userがある場合
        // ユーザーをJSON形式に変換して出力
        res.json(user);
    } else { // userがない場合
        res.status(404).json({ message: `ユーザーが見つかりませんでした。`});
    }
});

// Webサーバーを起動し、3000番ポートへのリクエストを待機
app.listen(3000, () => {
    console.log('http://localhost:3000 でWebサーバーを起動しました。');
});