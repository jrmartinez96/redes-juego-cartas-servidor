import Stack from "./stack.js";

class Deck extends Stack{

   constructor(){
       super();
   }

    shuffle(){
        var j, i, temp;
        for (i = this.stack.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.stack[i];
            this.stack[i] = this.stack[j];
            this.stack[j] = temp;
        }
    }
}

export default Deck;