import Stack from "./stack.js";

class Deck extends Stack{

   constructor(){
       super();
       this.stack = ['1c', '1d', '1e', '1t',
                    '2c', '2d', '2e', '2t',
                    '3c', '3d', '3e', '3t',
                    '4c', '4d', '4e', '4t',
                    '5c', '5d', '5e', '5t',
                    '6c', '6d', '6e', '6t',
                    '7c', '7d', '7e', '7t',
                    'jc', 'jd', 'je', 'jt',
                    'qc', 'qd', 'qe', 'qt',
                    'kc', 'kd', 'ke', 'kt'];
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