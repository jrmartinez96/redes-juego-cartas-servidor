import net from 'net';

const server = net.createServer();
const port = 8080;

let clients = [];

server.listen(port, function() {
    console.log('Escuchando a cliente...');
});

server.on('connection', function(socket) {
    //clients.push(socket.id);
    socket.id = Math.floor(Math.random() * 1000);
    console.log('A new connection has been established.');

    socket.on('data', function(chunk) {
        console.log('Data recibida por el cliente...');
        console.log(chunk.toString());
        //socket.write(chunk.toString());
        socket.write(socket.id);
    });

    socket.on('end', function() {
        console.log('Cerrando conexion con el cliente...');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});