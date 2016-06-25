'use strict'
var Game = require('./Game.js');
var GameCounter = require('./GameCounter.js')

// This class serves as the interface to all stored games. It's methods
// are used in the application layer functionality. This means 100%
// of the communication between the application and data layers is
// done through this class.
//
// It's also a singleton, since it doesn't make sense to have multiple GameLists
// unless we are trying to scale the game to support hundreds of thousands of users.

class GameList{
  constructor(){
    // An empty games list is initialized at object construction. Since this is
    // a singleton class, it's constructed on application startup.
    this.gameCollection = new Array();
  }

  addNewGame(callback) {
    var newID = this.generateNewGameID();

    var gameInstance = new Game(newID);

    this.gameCollection.push(gameInstance);

    // Return only ID of the newly generated game
    callback(newID);
  }

  // Increments the total number of games by 1. New games have this as their ID,
  // because this is an unique number.
  generateNewGameID() {
    return GameCounter.totalNumberOfGames+1;
  }


  // Saves a move made by a given player in the selected cell on the game board.
  saveMoveData(gameID, moveData, playerSign, callback){
    var self = this;

    var row = moveData.cell[0];
    var col = moveData.cell[1];

    self.gameCollection[gameID-1].gameBoard[row][col] = playerSign;
    self.gameCollection[gameID-1].numberOfMoves++;

    callback(true)


  }

  readCellContents(gameID, row, col, callback){
    var self = this;
    var requestedGame;
      // console.log(`i am working`);

    self.getCopyOfGameBoard(gameID, function(gameInstance) {
      requestedGame = gameInstance;

      var gameCellContents = requestedGame.gameBoard[row][col];
      callback(gameCellContents)
    })

  }

  getCopyOfGameBoard(gameID, callback) {
    var self = this;
    var requestedGame;

    // console.log(self.gameCollection);
    for (var i = 0; i < self.gameCollection.length; i++) {

      if(self.gameCollection[i].gameID == gameID){

        requestedGame = self.gameCollection[i];

        callback(requestedGame);
      }
    }
  }

  getTotalNumberOfGameTurns(gameID, callback) {

    this.getCopyOfGameBoard(gameID, function(gameInstance) {
      callback(gameInstance.numberOfMoves++);
    });

  }

  doesGameExist(gameID){
    var self = this;

    return new Promise(function(resolve, reject) {

      for (var i = 0; i < self.gameCollection.length; i++) {
        if(self.gameCollection[i].gameID===gameID){
          resolve(true);
        }
      }
      reject(false);

    });
  }

}

module.exports = new GameList();
