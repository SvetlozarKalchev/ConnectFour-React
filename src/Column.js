import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Disk from './Disk'

class Column extends Component {
  constructor(props) {
    super(props);

    this.state = { focused: false, ref: 'null', class:  'col' };
  }

  // This method is fired when clicking on a column.
  // It first resets the column's state, then it removes the highlight effect
  // from all columns on the board and finally it highlights the selected column.
  selectColumn(event) {
    var selectedColumn = event.currentTarget;
    // Notify the game board that the player has selected this column.
    this.props.onSelect(this)

    // Reset column state. Otherwise clicking twice on the same column will
    // deselect it, because the element's state won't be changed from the
    // first click, but unfocusAll() will have changed the CSS class.
    this.setState({ focused: false, ref: 'null', class: 'col'}, () => {

      // After resetting the state, change the CSS class for all elements.
      this.unfocusAll(()=> {

        // Then change the state of the selected column ONLY
        this.setState({ number: this.props.number, focused: true, ref: 'selected', class: 'col focused' }, () => {

        })

      });

    });

  }

  // Goes through every column on the page and sets the CSS class to the
  // default one. This removes all highlighting from the element.
  unfocusAll(callback) {
    var columns = document.getElementsByClassName('col');

    for (var i = 0; i < columns.length; i++) {
      columns[i].setAttribute('class', 'col');
    }
    callback();
  }

  // First calculates the correct position to place the disk and then
  // inserts it in the HTML.
  placeNewDisk(selectedColumn, callback) {
    var numberOfMoves = this.props.getNumberOfMoves();
    var cells = selectedColumn.childNodes;
    var diskColor = 'blue';

    if(numberOfMoves % 2 == 0) {
      diskColor = 'yellow';
    }

    // Go though each cell in the column.
    for (var j = 0; j < cells.length; j++) {

      var currentCell = cells[j];
      var previousCell = cells[j-1];

      // If the cell is empty.
      if (currentCell.innerHTML === '') {

        // If we reached the last cell, put the player disk in it.
        if(j === 5) {
          ReactDOM.render(<Disk color={diskColor}/>, currentCell);
          // Notify the game board where we put the disk
          callback(j);
          break;
        }

      // If the cell is NOT empty, put a disk in the one above it.
      } else {

        // If we reached the top cell, put the Disk in it.
        if(j === 0) {
          ReactDOM.render(<Disk color={diskColor}/>, currentCell);

          callback(j);
          break;

        } else {
            ReactDOM.render(<Disk color={diskColor}/>, previousCell);

            callback(j-1);
            break;

        }

      }
    }


  }

  render() {
    return(
      <div className={this.state.class} onClick={this.selectColumn.bind(this)}>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
      </div>
    )
  }

}

export default Column;
