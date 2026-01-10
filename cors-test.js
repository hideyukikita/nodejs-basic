const cors = require('cors');
const express = require('express');
const app = express();

// 安全なアクセス元だけ許可する設定
app.use(cors({
    origin: 'https://example.com', // 許可するドメインを指定
    method: ['GET', 'POST'], // 許可するHTTPメソッド
    credentioal: true, // 認証情報の送信を許可するかどうか
}));

// テスト用のGETルート
app.get('/test', (req, res) => {
    res.json({ message: `CORS設定成功!`});
});

// Webサーバー起動
app.listen(3000, () => {
    console.log(`3000番ポートでWebサーバーを起動しました。`);
});