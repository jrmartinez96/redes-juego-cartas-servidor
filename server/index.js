const net = require('net');

let stack = [];

console.log(stack.length);

const server = net.createServer()

const port = 8080;

server.listen(port, function() {
    console.log('Escuchando a cliente...');
});

server.on('connection', function(socket) {
    console.log('A new connection has been established.');

    socket.write('Bienvenido.');

    socket.on('data', function(chunk) {
        console.log('Data recibida por el cliente...');
    });

    socket.on('end', function() {
        console.log('Cerrando conexion con el cliente...');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
