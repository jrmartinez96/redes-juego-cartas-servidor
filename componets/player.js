import Hand from "./hand.js";

class Player {

    constructor(name){
        this.name = name;
        this.hand = new Hand();
        this.public_hand = new Hand();        
    }
}

export default Player;