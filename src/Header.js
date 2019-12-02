import React from 'react';


class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      this.setState({
        date: new Date()
      });
    }

  render(){
    return(
      <div key={1} id="upperContainer">
      <div id="headline">
        <p>This is what your<br/> week looks like.</p>
        <p id="tagline"> Better get to work</p>
      </div>
        <a target="_blank" rel="noopener noreferrer" href="http://calendar.google.com/" id="today"> {this.state.date.toString()}</a>
      </div>
    )
  }
}
export default Header;
