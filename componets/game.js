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
        this.mesa = [];
        this.pasarConsec = 0;
        this.cartaBasura = "";
    }

    start(){
        this.state = 1;
        this.deal(this.players);
        this.cartaBasura = this.principal_deck.pop()

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
                mesa: this.mesa,
                cartaBasura: {
                    cartaId: this.cartaBasura,
                    nombreCarta:  this.cartaBasura
                },
                cantidadCartasBaraja: this.principal_deck.stack.length, // Cantidad de cartas que se encuentran en la baraja principal
                cantidadCartas: { // Objeto que determina la cantidad de cartas que tiene cada jugador de la mesa, la llave es el id del jugador y al valor la cantidad de cartas que tiene
                    [this.players[0].id]: this.players[0].hand.stack.length,
                    [this.players[1].id]: this.players[1].hand.stack.length,
                    [this.players[2].id]: this.players[2].hand.stack.length
                },
                cartasJugador: player.hand
            }));
        });
    }

    deal(players){
        this.principal_deck.shuffle();
        for (let i = 0; i < 9; i++){
            players[0].hand.push(this.principal_deck.pop());
            players[1].hand.push(this.principal_deck.pop());
            players[2].hand.push(this.principal_deck.pop());
        }
    }

    validate_state(){
        if (this.principal_deck.empty()) {
            this.state = 0;
            let cantidadMinimaCartas = 8;
            let winPlayerId = ""

            this.players.forEach(player => {
                if (player.hand.stack.length < cantidadMinimaCartas) {
                    winPlayerId = player.id;
                    cantidadMinimaCartas = player.hand.stack.length
                }
            })

            this.players.forEach(player => {
                player.connection.sendUTF(JSON.stringify({
                    opcion: 2,
                    gameId: this.id,
                    ganadorId: winPlayerId
                }))
            })
        } else {
            for (let i = 0; i < this.players.length; i++){
                if (this.players[i].hand.stack.length === 0) {
                    this.state = 0;
                    this.players.forEach(player => {
                        player.connection.sendUTF(JSON.stringify({
                            opcion: 2,
                            gameId: this.id,
                            ganadorId: this.players[i].id
                        }))
                    })
                    break;
                }
            }
        }
    }

    validate_hand(cartasMano){
        let valid_hand = false;
        let hand = [cartasMano[0].cartaId, cartasMano[1].cartaId, this.cartaBasura]

        hand.sort()

        for (let i = 0; i < hand.length; i++){
            if (hand[i].substring(0, 1) == hand[0].substring(0, 1)){
                valid_hand = true;
            } else {
                valid_hand = false;
                break;
            }
        }

        if (!valid_hand) {
            let carta1 = parseInt(hand[0].substring(0,1))
            let carta2 = parseInt(hand[1].substring(0,1))
            let carta3 = parseInt(hand[2].substring(0,1))
            if (carta1 + 1 === carta2 && carta2 + 1 === carta3) {
                valid_hand = true
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

    changeGameState(option, data={}) {
        if (option === 0) { // PASAR TURNO
            this.pasarConsec++;
            if (this.pasarConsec === 3){
                this.cartaBasura = this.principal_deck.pop()
                this.pasarConsec = 0
            }

            let posPlayer = -1;

            this.players.forEach((player, index) => {
                if (player.id === this.player_turn) {
                    posPlayer = index
                }
            })

            this.player_turn = this.players[(posPlayer + 1)%3].id
        } else if (option === 1) { // MOVIMIENTO JUGADOR
            this.players.forEach((player, index) => {
                if (player.id === data.playerId) {
                    if (this.validate_hand(data.cartasMano)) {
                        let hand = [data.cartasMano[0].cartaId, data.cartasMano[1].cartaId, this.cartaBasura]
                        hand.sort()

                        this.mesa = [
                            ...this.mesa,
                            [
                                {
                                    cartaId: hand[0],
                                    nombreCarta: hand[0]
                                },
                                {
                                    cartaId: hand[1],
                                    nombreCarta: hand[1]
                                },
                                {
                                    cartaId: hand[2],
                                    nombreCarta: hand[2]
                                },
                            ]
                        ]

                        this.cartaBasura = data.cartaPagarId

                        // Eliminar cartas de mano
                        let indexCarta1 = player.hand.stack.indexOf(data.cartasMano[0].cartaId)
                        player.hand.stack.splice(indexCarta1, 1)

                        let indexCarta2 = player.hand.stack.indexOf(data.cartasMano[1].cartaId)
                        player.hand.stack.splice(indexCarta2, 1)

                        let indexCarta3 = player.hand.stack.indexOf(data.cartaPagarId)
                        player.hand.stack.splice(indexCarta3, 1)

                        let posPlayer = -1;

                        this.players.forEach((player, index) => {
                            if (player.id === this.player_turn) {
                                posPlayer = index
                            }
                        })

                        this.player_turn = this.players[(posPlayer + 1)%3].id

                    } else {
                        player.connection.sendUTF(JSON.stringify({
                            opcion: 4,
                            gameId: this.id,
                            mensaje: "Jugada no válida."
                        }))
                    }
                }
            })
        }

        this.sendGameState();
        this.validate_state();
    }

    sendGameState() {
        this.players.forEach(player => {
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
                mesa: this.mesa,
                cartaBasura: {
                    cartaId: this.cartaBasura,
                    nombreCarta:  this.cartaBasura
                },
                cantidadCartasBaraja: this.principal_deck.stack.length, // Cantidad de cartas que se encuentran en la baraja principal
                cantidadCartas: { // Objeto que determina la cantidad de cartas que tiene cada jugador de la mesa, la llave es el id del jugador y al valor la cantidad de cartas que tiene
                    [this.players[0].id]: this.players[0].hand.stack.length,
                    [this.players[1].id]: this.players[1].hand.stack.length,
                    [this.players[2].id]: this.players[2].hand.stack.length
                },
                cartasJugador: player.hand
            }));
        });
    }

}

export default Game;