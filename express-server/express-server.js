// expressモジュールを取り込む
const express = require('express');

// Webサーバーの土台を作成
const app = express();

// ルートURL('/')へのアクセス(GETリクエスト)に対する処理
app.get('/', (req, res) => {
    res.status(200).set('Content-Type', 'text/html; charset=utf-8');
    res.send('<h1>ホームページへようこそ！</h1>');
});

// Aboutページへのアクセス(GETリクエスト)に対する処理
app.get('/about', (req, res) => {
    res.status(200).set('Content-Type', 'text/html; charset=utf-8');
    res.send('<h1>このサイトについて</h1>');
});

// それ以外のURLアクセスに対する処理(404 Not Found)
app.use((req, res) => {
    res.status(404).set('Content-Type', 'text/html; charset=utf-8');
    res.send('<h1>ページが見つかりませんでした。</h1>');
});

// Webサーバーを起動し、3000番ポートへのリクエストを待機
app.listen(3000, () => {
    console.log('http://localhost:3000 でWebサーバーが起動しました。');
});
