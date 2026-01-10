const express = require('express');
const app = express();

// ミドルウェアでJSON形式のリクエストボディを自動的にパース
app.use(express.json());

// 単体テストの対象関数
// ログイン試行回数に基づいてログイン可否を判定
function canLogin(attempts) {
    // 試行回数が5回未満ならログイン可能(true)
    return attempts < 5 ? true : false;
}

// 結合テストの対象ルート
// ログイン試行回数による可否判定
app.post('/login', (req, res) => {
    const { attempts } = req.body; // 試行回数

    // ログイン可否に応じてメッセージを返す
    if(canLogin(attempts)) {
        res.status(200).json({ message: 'ログイン成功'});
    } else {
        res.status(403).json({ message: '試行回数超過のため、アカウントはロックされています。'});
    }
});

// テスト対象をエクスポート
module.exports = { app, canLogin };