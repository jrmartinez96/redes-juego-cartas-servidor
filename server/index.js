/*let p1 = new Player('Jose');
let p2 = new Player('Luis');
let p3 = new Player('Pedro');

let players = []

players.push(p1);
players.push(p2);
players.push(p3);


let game = new Game(1, players);

game.start();

game.deal(players);

while (game.state == 1)

game.validate_state();
*/


let games = [];
let players = []

const webSocketsServerPort = 8000;
import pkg from 'websocket';
const {server: webSocketServer} = pkg;
import http from 'http'
import Player from '../componets/player.js';
import Game from '../componets/game.js'
import Hand from '../componets/hand.js';

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  
  connection.on('message', function(message){
    let data = JSON.parse(message.utf8Data);

    if (data.opcion == 0) {
        let player = new Player(getUniqueID(), data.nombre, connection);
        players.push(player);
        if (players.length == 3) {
            let game = new Game(getUniqueID(), players);
            game.start();
            games.push(game);

        }
    } else if (data.opcion == 1){
        if (!data.pasar){
            games.forEach(game => {
                let hand = new Hand();
                if (game.id == data.gameId){
                    data.cartasMano.forEach(carta => {
                        hand.push(carta);
                    });
                    hand.sort();
                    if (game.validate_hand(hand)){
                        game.players.forEach(player => {
                            if (player.id = data.playerId){
                                hand.stack.forEach(card =>{
                                    
                                    player.public_hand.push(card);
                                    
                                });
                            }
                        });
                    }
                }
            });
        }
    } else if (data.opcion == 2){
        games.forEach(game => {
            if (game.id == data.gameId){
                game.send_message(data.playerId, data.mensaje);
            }
        });
    }
  });
});

