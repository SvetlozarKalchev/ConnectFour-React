'use strict'
// A singleton class that holds the total number of games, so we can
// create gameIDs without any chance of duplication.
class GameCounter{
      constructor(){
        this.totalNumberOfGames=0;
      }
}

module.exports = new GameCounter();
