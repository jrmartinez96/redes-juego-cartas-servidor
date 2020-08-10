class Deck {

    constructor(){
        this.index = -1;
        this.stack = [];
    }

    empty() {
        if (this.index == -1) {
            return true;
        } else {
            return false;
        }
    }

    push(element){
        this.index++;
        this.stack.push(element);
    }

    pop(){
        if (!this.empty()){
            let element = this.stack[this.index];
            this.index--;
            return element;
        }
    }

    top(){
        if (!this.empty()){
            return this.stack[this.index];
        }
    }

}