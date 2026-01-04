// fsモジュールのインポート
const fs = require('fs');

// 書き込む内容
const message = `これはfsモジュールで書き込んだテキストです。`;

// ファイルに書き込む
fs.writeFile('./module/module-fs.txt', message, (err) => {
    if(err){
        console.log(`書き込みエラー: ${err}`);
        return;
    }

    console.log(`ファイルへの書き込みが完了しました。`);

    // 書き込んだファイルを読み込む
    fs.readFile('./module/module-fs.txt', 'utf8', (err, data) => {
        if(err){
            console.log(`読み込みエラー: ${err}`);
            return;
        }
        console.log(`読み込んだ内容: ${data}`);

        }
    );
});
