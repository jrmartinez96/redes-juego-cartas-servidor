class Stack {
    constructor(){
        this.index = -1;
        this.stack = [];
    }

    qtyOfCards(){
        return this.stack.length;
    }

    empty() {
        if (this.index == -1) {
            return true;
        } else {
            return false;
        }
    }

    push(element){
        this.stack.push(element);
        this.index++;
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

export default Stack;