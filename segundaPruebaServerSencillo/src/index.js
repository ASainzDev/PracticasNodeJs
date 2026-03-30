const http = require('node:http');

const port = 3000;
const host = 'localhost';

const info = {
    user: "Alex",
    estado: "Probando",
    tiempo: 1
};

const servidor = http.createServer((req, res) => {

    console.log("Bienvenido");

    if (req.url === '/quien' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(info));
    } else if (req.url === '/login' && req.method === 'POST') {
        if (req.headers['content-type'] !== 'application/json') {
            res.writeHead(415, { 'Content-Type': 'text/plain' });
            return res.end('Formato de datos incorrecto');
        };

        const data = [];

        req.on('data', chunk => {
            data.push(chunk);
        });

        req.on('end', () => {
            //Aquí he tenido que meter logs porque había puesto algo mal al añadir el try-catch. Primero iba sin el. 
            //Luego intenté unas modificaciones y puse el try-catch y explotaba. Dejo los logs porque si algún día reviso
            //se que ahí tuve un problema.
            console.log('He llegado aquí');
            try {
                console.log(data);
                const body = Buffer.concat(data);
                console.log(body);
                const bodyFinal = JSON.parse(body.toString());
                console.log(bodyFinal);

                if (!bodyFinal.user || bodyFinal.user !== 'Alex' || typeof bodyFinal.user !== 'string') {
                    res.writeHead(401, { 'Content-Type': 'text/plain' });
                    return res.end('Acceso prohibido');
                    ;
                }

                const estado = {
                    user: bodyFinal.user,
                    estatus: 'Logged In'
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(estado));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('JSON con formato inválido');
            }
        });
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Petición incorrecta');
});

servidor.listen(port, host, () => {
    console.log("Arrancando");
});