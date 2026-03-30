const http = require('node:http');

const host = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Request recibida y aceptada');

    if(req.url === '/GET' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        return res.end('OK');
    } else if(req.url === '/post' && req.method === 'POST'){
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () =>{
            try{
                const data = JSON.parse(body);

                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(data));
            }catch (error){
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('JSON con formato inválido');
            }
        });
        return;
    }

    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end ('Petición Incorrecta');
    
});

server.listen(port, ()=>{
    console.log('Servidor iniciado en local');
});

