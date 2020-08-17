import Stack from "./stack.js";

class Deck extends Stack{

   constructor(){
       super();
       this.stack = ['0c', '0d', '0e', '0t',
                    '1c', '1d', '1e', '1t',
                    '2c', '2d', '2e', '2t',
                    '3c', '3d', '3e', '3t',
                    '4c', '4d', '4e', '4t',
                    '5c', '7d', '5e', '5t',
                    '6c', '6d', '6e', '6t',
                    '7c', '7d', '7e', '7t',
                    '8c', '8d', '8e', '8t',
                    '9c', '9d', '9e', '9t'];
        this.index = this.stack.length - 1; //ver si es -1
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