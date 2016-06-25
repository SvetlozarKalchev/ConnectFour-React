import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = { disabled: false, status: 'true'}
  }

  startTurn() {
    // Calls the startTurn() method of the GameBoard component.
    this.props.startTurn();
  }
  
  // Make button inactive
  changeStatus() {
    this.setState({ status: 'false'})
  }

  render() {
    return(
      <button className='select' ref='lock' enabled={this.state.disabled} onClick={this.startTurn.bind(this)}>Make Move</button>
    )
  }
}

export default Button;
