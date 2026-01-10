//////////////////////////////////////////////
// データベース共通モジュール
//////////////////////////////////////////////

//mysql2モジュールのpromiseを取り込む
const mysql = require('mysql2/promise');

//DB接続設定を環境変数から取得
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

//DB接続プールを作成
const pool = mysql.createPool(dbConfig);

// DB接続プールを破棄
async function closePool() {
    try {
        await pool.end();
        console.log(`データベース接続プールを破棄しました。`);
    } catch (error) {
        console.error(`データベース接続プール破棄中にエラーが発生しました。`);
    }
}

// SQL文を実行
async function executeQuery(sql, params = []){
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// モジュールとしてエクスポート
module.exports = {
    closePool,
    executeQuery
};