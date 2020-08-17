import Player from "./player.js";
import Deck from "./deck.js";

class Game {

    constructor(id, players){
        this.id = id;
        this.players = players;
        this.state = -1;
        this.principal_deck = new Deck();
        this.trash_deck = new Deck();
        this.player_turn = 0;
        this.winner = null;
    }


    start(){
        this.state = 1;
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

    validate_hand(player, hand){
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

}

let p1 = new Player('Jose');
let p2 = new Player('Luis');
let p3 = new Player('Pedro');

let players = []

players.push(p1);
players.push(p2);
players.push(p3);


let game = new Game(1, players);

game.start();

game.deal(players);

game.validate_state();

export default Game;