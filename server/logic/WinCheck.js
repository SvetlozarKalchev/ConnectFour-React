'use strict';
var player_one = 'blu';
var player_two = 'yel';


var win = false;

module.exports = {
  win_check: function win_check(reps) {
    if(reps === 4) {
      return true;
    } else return false;
  },

  horizontal_check: function horizontal_check(game, playerSign, callback) {
    var reps = 0;

    for (var row = 5; row >= 0; row--) {

      for (var col = 0; col < 7; col++) {

        if(game[row][col] == playerSign) {

          reps++;

          if(reps === 4) {
            // win
            callback(true)
          }

        } else {
           if(reps > 0) {
             reps = 0;

            //  no win
            callback(false);
           }
        }

      }

    }
  },

  vertical_check: function vertical_check(player_sign) {
    for (var col = 0; col < 7; col++) {

      for (var row = 5; row >= 0; row--) {

        if(game_one[row][col] === player_sign) {
          // console.log('Saw ' + player_sign);
          reps++;

          // Check if player has won
          // console.log(win_check(reps));

        } else {

           if(reps > 0) {
             reps = 0;
          }
        // End of else
        }

      }

    }
    // End of method
  },

  top_to_bottom_diagonal_check: function top_to_bottom_diagonal_check(player_sign) {

      var checks = [
      [[2,0], [3,1], [4,2], [5,3]],
      [[1,0], [2,1], [3,2], [4,3], [5,4]],
      [[0,0], [1,1], [2,2], [3,3], [4,4], [5,5]],
      [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6]],
      [[0,2], [1,3], [2,4], [3,5], [4,6]],
      [[0,3], [1,4], [2,5], [3,6]]
    ];

    var current_check;

    // Go through each combination of coordinates
    for(var i = 0; i < checks.length; i++) {
      current_check = checks[i];
      // console.log(current_check);

      // Go through current combination
      for(var j = 0; j < current_check.length; j++) {
        // console.log(current_check[j]);
        var row = current_check[j][0];
        var col = current_check[j][1];

        // Check coordinates
        if(game_one[row][col] === player_sign) {
            // console.log('Saw ' + player_sign);
            reps++;

            // Check if player has won
            if(win_check(player_sign)) {
              return;
            }

          } else {
              console.log('No match');
             if(reps > 0) {
               reps = 0;
            }
          }

    }
  }

},


  bottom_to_top_diagonal_check:
  function bottom_to_top_diagonal_check(player_sign) {

    var checks = [
      [[3,0], [2,1], [1,2], [0,3]],
      [[4,0], [3,1], [2,2], [1,3], [0,4]],
      [[5,0], [4,1], [3,2], [2,3], [1,4], [0,5]],
      [[5,1], [4,2], [3,3], [2,4], [1,5], [0,6]],
      [[5,2], [4,3], [3,4], [2,5], [1,6]],
      [[5,3], [4,4], [3,5], [2,6]]
    ];

      var current_check;

      // Go through each combination of coordinates
      for(var i = 0; i < checks.length; i++) {
        current_check = checks[i];
        // console.log(current_check);

        // Go through current combination
        for(var j = 0; j < current_check.length; j++) {
          // console.log(current_check[j]);
          var row = current_check[j][0];
          var col = current_check[j][1];

          // Check coordinates
          if(game_one[row][col] === player_sign) {
              console.log('Saw ' + player_sign);
              reps++;

              // Check if player has won
              if(win_check(player_sign)) {
                return;
              }

            } else {
                console.log('No match');
               if(reps > 0) {
                 reps = 0;
              }
            }

      }
    }

  }

}
