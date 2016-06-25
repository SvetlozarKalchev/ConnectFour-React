import React, {Component} from 'react';

import Column from './Column'
import Button from './Button'

class GameBoard extends Component {

  constructor(props) {
    super(props);

    this.state = { numberOfMoves: 0, gameID: 0, selectedColumn: null, numberOfColumn: null, selectedCell: null, button: null }
  }

  onColumnClick(selectedColumn) {
    this.setState({ selectedColumn: selectedColumn, numberOfColumn : selectedColumn.props.number }, ()=> {

    });
  }

  sendMoveDataToServer(data) {
    var self = this;

    $.ajax({
      type: "POST",
      url: "http://localhost:8000/game",
      data: data,
      success: function(val){
        // Insert data into board
        console.log(`Receive ${val} from server`);
        self.setState({ gameID: val}, function() {
          console.log(`Game ID on client is ${val}`);
        })
      },
      error: function() {
        console.log('Error with AJAX');
      }

    });
  }

  getNumberOfMoves() {
    return this.state.numberOfMoves;
  }

  startTurn() {
    var selectedColumn = this.state.selectedColumn;

    // Check if column is selected
    if(selectedColumn === null) {

      alert('Please select a column')

    } else {
        var newValue = this.state.numberOfMoves + 1;
        var self = this;

        this.setState({ numberOfMoves: newValue}, function() {

          // Unhighlight the selected column, because the game turn is in progress.
          selectedColumn.setState({class: 'col'});

          // Get the selected column's HTML contents, so it can be used
          // in it's placeNewDisk() method.
          var selectedColumnHTML = document.getElementsByClassName('focused')[0];

          // Place a disk in the selected column
          selectedColumn.placeNewDisk(selectedColumnHTML, (j)=> {

            console.log(`Selected Cell ${j}`);
            // Send the move data to the server
            var moveData = {
              cell: [j , this.state.numberOfColumn],
              gameID: this.state.gameID
            }
            this.sendMoveDataToServer(moveData)

            this.setState({selectedColumn: null})
          });



        })


    }
  }

  render() {
    return (
      <div class="game-board">
        <Column number='0' getNumberOfMoves={this.getNumberOfMoves.bind(this)} onSelect={this.onColumnClick.bind(this)} />
        <Column number='1' getNumberOfMoves={this.getNumberOfMoves.bind(this)} onSelect={this.onColumnClick.bind(this)} />
        <Column number='2' getNumberOfMoves={this.getNumberOfMoves.bind(this)} onSelect={this.onColumnClick.bind(this)} />
        <Column number='3' getNumberOfMoves={this.getNumberOfMoves.bind(this)} onSelect={this.onColumnClick.bind(this)} />
        <Column number='4' getNumberOfMoves={this.getNumberOfMoves.bind(this)} onSelect={this.onColumnClick.bind(this)} />
        <Column number='5' getNumberOfMoves={this.getNumberOfMoves.bind(this)} onSelect={this.onColumnClick.bind(this)} />
        <Column number='6' getNumberOfMoves={this.getNumberOfMoves.bind(this)} onSelect={this.onColumnClick.bind(this)} />
      <br/>

      <Button startTurn={this.startTurn.bind(this)}/>

      </div>
    )
  }
}

export default GameBoard;
