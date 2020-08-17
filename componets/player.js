import Hand from "./hand.js";

class Player {

    constructor(id, name, connection){
        this.id = id;
        this.name = name;
        this.connection = connection;
        this.hand = new Hand();
        this.public_hand = new Hand();        
    }
}

export default Player;