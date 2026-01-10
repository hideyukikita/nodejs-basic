// ポート番号を環境変数から取得
const port = process.env.PORT || 3000;

// DB接続情報を環境変数から取得
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

console.log(`使用ポート番号: ${port}`);
console.log('DB接続情報:' + JSON.stringify(dbConfig, null, 2));