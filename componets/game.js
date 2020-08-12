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
    }
}