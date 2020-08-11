import Hand from "./hand.js";

class Player {

    constructor(name){
        this.name = name;
        this.hand = new Hand();        
    }
}

export default Player;