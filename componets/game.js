import Player from "./player.js";
import Deck from "./deck.js";

class Game {

    constructor(id){
        this.id = id;
        this.state = -1;
        this.principal_deck = new Deck();
        this.trash_deck = new Deck();
        this.player1 = new Player();
        this.player2 = new Player();
        this.player3 = new Player();
        this.player_turn = 1;
    }
}