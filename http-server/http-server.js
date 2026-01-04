// httpモジュールを取り込む
const http = require('http');

// Webサーバーを作成
const server = http.createServer((request, response) => {
    const url = request.url; // リクエストのURL
    const method = request.method; // リクエストメソッド

    console.log(`アクセスされたURL: ${url}`);
    console.log(`メソッド: ${method}`);

    // URLに応じてレスポンスを切り替える
    if(url === '/'){
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end('<h1>ホームページへようこそ！</h1>');
    }else if(url === '/about'){
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end('<h1>このサイトについて</h1>');
    }else{
        response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        response.end('<h1>ページが見つかりませんでした。</h1>'); 
    }
});

// Webサーバーを起動し、3000番ポートへのリクエストを待機
server.listen(3000, () => {
    console.log('http://localhost:3000 でWebサーバーが起動しました。')
})