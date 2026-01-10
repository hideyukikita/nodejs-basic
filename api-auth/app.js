/////////////////////////////////////////////////////////////////////
// ユーザー認証メインファイル
/////////////////////////////////////////////////////////////////////
const express = require('express');
const app = express();

const cors = require('cors'); //CORS
const cookieParser = require('cookie-parser'); //cookie-parser
const authRoutes = require('./auth'); //ユーザー認証モジュール
const { closePool } = require('./db');

// CORSミドルウェア(クッキー送信のために設定)
app.use(cors({
    origin: 'http://localhost:3000', // フロントエンドのURLに合わせる
    methods: [ 'GET', 'POST' ], 
    credentials: true
}));

// JSON形式のリクエストボディをパース
app.use(express.json());

// リクエスト内のクッキーをパース
app.use(cookieParser());

// ユーザー認証モジュールをappに組み込む
app.use(authRoutes);

// アプリ終了時にDB接続プールを安全に閉じる
['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(signal => {
    process.on(signal, async() => {
        console.log(`\n${signal}を受信。アプリケーションの終了処理中...`);
        await closePool();
        process.exit();
    });
});

// Webサーバーを起動
const PORT = process.env.PORT || 3000; // 環境変数を使用
app.listen(PORT, () => {
    console.log(`\n${PORT}番ポートでWebサーバーが起動しました。`);
});