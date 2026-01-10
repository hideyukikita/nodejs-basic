///////////////////////////////////////////////
// JWTトークン作成・検証モジュール
//////////////////////////////////////////////

const jwt = require('jsonwebtoken');

// 環境変数から秘密鍵を取得
const SECRET_KEY = process.env.JWT_SECRET;

//JWTの有効期限(今回は1時間とする)
const EXPIRES_IN = '1h';

//トークンを生成する関数
function generateToken(payload){
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
};

// トークンを検証するミドルウェア関数
// このミドルウェアを適用したルートは、有効なJWTを含むリクエストのみがアクセス可能
function verifyToken(req, res, next) {
    // リクエスト内のクッキー情報からトークンを取得
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ message: '認証トークンがありません' });
    }

    try {
        // jwt.verify()関数でトークンと秘密鍵を照合し、トークンの正当性を検証
        const decoded = jwt.verify(token, SECRET_KEY);

        // 検証に成功した場合、返されたペイロード(ユーザー情報など)をリクエストに追加
        // これにより、後続の処理で認証されたユーザー情報にアクセス可能となる
        req.user = decode;

        // next()で次のミドルウェアまたはルート処理へ
        next();
    } catch (error) {
        return res.status(401).json({ message: 'トークンが無効です' });
    }
}

// モジュールとしてエクスポート
module.exports = {
    generateToken,
    verifyToken
};