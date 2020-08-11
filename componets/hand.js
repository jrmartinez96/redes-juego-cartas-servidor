import Stack from "./stack.js";

class Hand extends Stack{

    constructor(){
        super();
    }

    sort(){
        this.stack.sort();
    }
}

