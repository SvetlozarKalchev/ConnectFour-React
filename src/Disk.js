import React, {Component} from 'react'

class Disk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color:  this.props.color
    }
  }

  determineColor() {

  }

  render() {
    return(
      <div className={this.state.color}></div>
    )
  }
}

export default Disk;
