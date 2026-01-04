// mysql2モジュールのpromiseを取り込む
const mysql = require('mysql2/promise');

// DB接続設定
const dbConfig = {
    host: 'localhost', 
    port: 3306,
    user: 'root',
    password: '',
    database: 'nodejs_db',
};

// DB接続プールを作成
const pool = mysql.createPool(dbConfig);

// DB接続プールを破棄
async function closePool() {
    try{
        await pool.end();
        console.log(`データベース接続プールを破棄しました。`);
    } catch(error) {
        console.log(`データベース接続プールの破棄中にエラーが発生しました。`, error);
    }
}

// SQL文を実行
async function executeQuery(sql, params = [] ){
    try{
        const [rows] = await pool.execute(sql, params);
        return [rows];
    } catch(error) {
        console.error(error);
        throw error;
    }
}

// モジュールとしてエクスポート
module.exports = {
    closePool,
    executeQuery
};