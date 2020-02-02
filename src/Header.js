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
      <div key={1} className="upperContainer">
      <div className="headline">
        <p>This is what your<br/> week looks like.</p>
        <p className="tagline"> Better get to work</p>
      </div>
      <div className="linkContainer">
        <a target="_blank" rel="noopener noreferrer" href="http://calendar.google.com/" className="today"> {this.state.date.toString()}</a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/VMehta99/workweek" className="instructions">Some Instructions</a>
       </div>
    </div>
    )
  }
}
export default Header;
