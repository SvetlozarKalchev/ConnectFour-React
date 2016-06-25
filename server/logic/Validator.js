'use strict';
var GameList = require('../data/GameList.js')
var WinCheck = require('../logic/WinCheck.js');

class Validator {
  // Main function that runs through all checks
  manageGame(moveData, callback) {
    // Reference to the GameList object
    var self = this;

    // First we check if the game is new.
    //  If it is, we create a new game object and get the gameID back.
    //  If it isn't, we get the gameID back.
    self.checkIfNewGame(moveData, function onCheckFinished(gameID) {

      // Now we have the gameID. Check if the move made is valid.
      self.checkIfMoveIsValid(gameID, moveData, function onCheckFinished(isValid) {
        // Now we know if the move is valid. Save move data to database
        if(isValid) {
          console.log(`>Game move is valid`);

          // Determine player sign and save data
          var playerSign;

          GameList.getTotalNumberOfGameTurns(gameID, function(numberOfMoves) {
            playerSign = 'yel'
            console.log(numberOfMoves);
            if(numberOfMoves % 2 == 0) {
              playerSign = 'blu';

            }
              GameList.saveMoveData(gameID, moveData, playerSign, function(saveOperationResult) {

                  // CHECK FOR WIN
                  self.checkForWin(gameID, function(result) {
                    // console.log(`Is this a winning move? ${result}`);
                  })

                }
              );


          });
          //
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        } else {
          console.log('Game move is not valid');
        }

      });

    });

  }

  checkForWin(gameID, callback) {
    GameList.getCopyOfGameBoard(gameID, function(gameInstance) {
      WinCheck.horizontal_check(gameInstance.gameBoard, 'blu', function(result) {

        if(result) {
          callback(result);
        } else {
          // Check for other player
          WinCheck.horizontal_check(gameInstance.gameBoard, 'yel', function(result) {
            if(result) {
              callback(result);
            } else {
              callback(result)
            }
          })

        }

      })

    });
  }

  checkIfMoveIsValid(gameID, moveData, callback) {
    var row = moveData.cell[0];
    var col = moveData.cell[1];
    // If move is in correct coordinates
    if(row < 8 && col < 7) {
      // Get the cell contents and see if the cell is empty
      GameList.readCellContents(gameID, row, col, function(cellContents) {

        console.log('Correct move');
        // If empty
        if(cellContents === 'e') {
          callback(true);

        } else {
          callback(false);
        }
      })

    } else {
      callback(false);
    }

  }

  checkIfNewGame(moveData, callback) {
    var gameID = moveData.gameID;
    // If game is new, create a new game and get it's ID
    if(gameID == 0) {
      console.log('Game is new');

      // After the game is added, return it's ID
      GameList.addNewGame(function whenGameIsAdded(gameID) {
        callback(gameID)
      })

    } else {
      console.log('Game is not new');
      callback(gameID);
    }
  }


}

module.exports = new Validator();
