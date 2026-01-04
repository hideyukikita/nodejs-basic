// mysql2モジュールのpromiseを取り込む
const mysql = require('mysql2/promise');

// 非同期処理でデータベースを操作
async function getUsers() {
    let connection;
    try {
        //データベースに接続
        connection = await mysql.createConnection({
            host: 'localhost', // ホスト名
            port: 3306, // ポート番号
            user: 'root', // MySQLのユーザー名
            password: '', // MySQLのパスワード
            database: 'nodejs_db', // 使用するデータベース名
        });

        console.log(`MySQLデータベースに接続しました。`);

        // SQL分をMySQLに送信し、usersテーブルの全データを取得
        const [rows] = await connection.execute('SELECT * FROM users;');

        // 取得したデータを表示
        console.log(`usersテーブルのデータ:`, rows);
    } catch(error) {
        console.error(`データベース操作エラー: `, error);
    } finally {
        // 接続解除(エラーの有無にかかわらず実行)
        if(connection){
            await connection.end();
            console.log(`データベース接続を解除しました。`);
        }
    }
}

// ユーザーリストを取得
getUsers();