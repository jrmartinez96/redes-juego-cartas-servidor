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

import pkg from 'websocket';
const {server: webSocketServer} = pkg;
import http from 'http'
import Player from '../componets/player.js';
import Game from '../componets/game.js'
import Hand from '../componets/hand.js';

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(process.env.PORT || 8000);
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
            players = []
        }

        connection.on('close', function(req) { // Cuando un cliente se desconecta
            let playerPos = -1;

            players.forEach((playerr, index) => {
                if (playerr.id === player.id) {
                    playerPos = index
                }
            })

            if (playerPos !== -1) { // Si el jugador sigue en la lista de players
                players.splice(playerPos, 1)
            } else { // Si el jugador ya se encuentra en un juego
                let gamePos = -1;

                games.forEach((game, index) => {
                    game.players.forEach(playerr => {
                        if (playerr.id === player.id) {
                            gamePos = index
                        }
                    })
                })

                if (gamePos !== -1) {
                    games[gamePos].players.forEach(playerr => {
                        if (playerr.id !== player.id) {
                            playerr.connection.sendUTF(JSON.stringify(
                                {
                                    opcion: 4,
                                    gameId: games[gamePos].id,
                                    mensaje: `${player.name} se desconecto del juego.`
                                }
                            ))
    
                            playerr.connection.close()
                        }
                    })

                    games.splice(gamePos, 1);
                    console.log({games})
                }
            }
        })
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
                    } else {
                      connection.sendUTF(JSON.stringify({
                        opcion: 4,
                        gameId: game.id,
                        mensaje: "Jugada no válida."
                      }))
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

