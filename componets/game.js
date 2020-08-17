import Player from "./player.js";
import Deck from "./deck.js";
import Protocol from '../protocol/protocolo-conquian.js';

class Game {

    constructor(id, players){
        this.id = id;
        this.players = players;
        this.state = -1;
        this.principal_deck = new Deck();
        this.trash_deck = new Deck();
        this.player_turn = this.players[0].id;
        this.winner = null;
        this.protocol = new Protocol();
    }

    start(){
        this.state = 1;
        this.deal(this.players);

        this.players.forEach(player => {
            player.connection.sendUTF(JSON.stringify(
                {
                    opcion: 1,
                    gameId: this.id, // Id del juego en el que estará el jugador
                    playerId: player.id, // Identificador del jugador que se le asigno
                }
            ))
            player.connection.sendUTF(JSON.stringify({
                opcion: 0,
                gameId: this.id, // Identificador del juego
                turnoId: this.player_turn, // Id del usuario en turno
                players: [ // Listado de jugadores en el juego
                    {
                        playerId: this.players[0].id, // identificador del jugador
                        playerName: this.players[0].name// nombre del jugador
                    },
                    {
                        playerId: this.players[1].id, // identificador del jugador
                        playerName: this.players[1].name // nombre del jugador
                    },
                    {
                        playerId: this.players[2].id, // identificador del jugador
                        playerName: this.players[2].name // nombre del jugador
                    }
                ],
                mesa: [
                   
                ],
                cartaBasura: {
                    cartaId: this.principal_deck.top(),
                    nombreCarta:  this.principal_deck.top()
                },
                cantidadCartasBaraja: this.principal_deck.stack.length, // Cantidad de cartas que se encuentran en la baraja principal
                cantidadCartas: { // Objeto que determina la cantidad de cartas que tiene cada jugador de la mesa, la llave es el id del jugador y al valor la cantidad de cartas que tiene
                    [this.players[0].id]: this.players[0].hand.index + 1,
                    [this.players[1].id]: this.players[1].hand.index + 1,
                    [this.players[2].id]: this.players[2].hand.index + 1
                },
                cartasJugador: player.hand
            }));
        });
    }

    deal(players){
        for (let i = 0; i < 8; i++){
            players[0].hand.push(this.principal_deck.pop());
            players[1].hand.push(this.principal_deck.pop());
            players[2].hand.push(this.principal_deck.pop());
        }
    }

    validate_state(){
        if (this.principal_deck.empty()) {
            this.state = 0;
            console.log('La baraja se quedo sin cartas.');
        } else {
            for (let i = 0; i < players.length; i++){
                if (players[i].hand.empty()) {
                    this.state = 0;
                    console.log('Gano un jugador.');
                    break;
                }
            }
        }
    }

    validate_hand(hand){
        let valid_hand = false;

        
        if (hand.stack.length >= 3) {

            hand.sort();

            if (hand.stack.length == 4){
                for (let i = 1; i < hand.stack.length; i++){
                    if (hand.stack[i].substring(0, 1) == hand.stack[0].substring(0, 1)){
                        valid_hand = true;
                    } else {
                        valid_hand = false;
                        break;
                    }
                }
            } else {
                valid_hand = true;
                for (let i = 0; i < hand.stack.length - 1; i++){
                    if (hand.stack[i] + 1 != hand.stack[i + 1]){
                        valid_hand = false;
                    }
                }
            }
        }

        return valid_hand;
    }

    send_message(player_id, message){
        this.players.forEach(player => {
            player.connection.sendUTF(JSON.stringify({
                opcion: 3,
                playerId: player_id,
                gameId: this.id, // identificador del cliente que manda el mensaje,
                mensaje: message // Mensaje que desea mandar
            }));
        });
    }

}

export default Game;