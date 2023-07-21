Vue.component("num-box", {

    props: ["player", "isDisabled"],

    template : 
    `
    <div style="display: inline-block;" >
        <button 
        class='btn btn-responsive' 
        
        v-on:click="fillButton"
        
        :class="{
            'btn-primary': playerFilled === ' ',
            'btn-danger': playerFilled === 'X',
            'btn-warning': playerFilled === 'O',
          }"

        :disabled="isFilled || isDisabled"
        
        >
          <span>{{ playerFilled }}</span>
        </button>
    </div>
    `,

    data: function(){
        return {
            playerFilled : " ",
            isFilled : false,
        }
    },

    methods:{
        fillButton: function()
        {   
          this.playerFilled = this.player;
          this.isFilled = true;
          this.$emit("change-player");
        }
    },
})

var app = new Vue({
    el: "#app",

    data : {
        winner : null,
        globalCounter : "X",
        clickCount : 0,
        displayText : "X's TURN",

        boxStates: [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
          ],
    },

    methods : {
        toggleCounter: function(row, col){
            this.boxStates[row][col] = this.globalCounter;
            this.clickCount++ ;
            this.globalCounter = this.globalCounter === "X" ? "O" : "X"; // Toggle player first
            this.checkWinningCondition();

            if(this.winner !== null)
              this.displayText = this.winner + " WINS!";

            else if(this.clickCount === 9)
              this.displayText = "DRAW THE MATCH";

            else
              this.displayText = this.globalCounter + "'s TURN";
        },


        checkWinningCondition: function () {
            // Check row-wise and column-wise
            for (let i = 0; i < 3; i++) {
              if (
                this.boxStates[i][0] !== " " &&
                this.boxStates[i][0] === this.boxStates[i][1] &&
                this.boxStates[i][1] === this.boxStates[i][2]
              ) {
                this.winner = this.boxStates[i][0];
                return;
              }
          
              if (
                this.boxStates[0][i] !== " " &&
                this.boxStates[0][i] === this.boxStates[1][i] &&
                this.boxStates[1][i] === this.boxStates[2][i]
              ) {
                this.winner = this.boxStates[0][i];
                return;
              }
            }
          
            // Check diagonals
            if (
              this.boxStates[1][1] !== " " &&
              ((this.boxStates[0][0] === this.boxStates[1][1] &&
                this.boxStates[1][1] === this.boxStates[2][2]) ||
                (this.boxStates[0][2] === this.boxStates[1][1] &&
                  this.boxStates[1][1] === this.boxStates[2][0]))
            ) {
              this.winner = this.boxStates[1][1];
              return;
            }
          },

          newGame: function(){
            window.location.reload();
          }
          
    },
})

