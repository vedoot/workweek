import React from 'react';
import Day from './Day';

import './index.css';

class Week extends React.Component {
  constructor(props){
    super(props);
    this.state={
      events: {
        Mon:[],
        Tue:[],
        Wed:[],
        Thur:[],
        Fri:[],
        Sat: [],
        Sun:[],
      },
      date: new Date()
    }
    this.handler  = this.handler.bind(this);
    // this.sort = this.handler.bind(this);
  }
componentWillMount(){
  localStorage.getItem('events') && this.setState({
    events:JSON.parse(localStorage.getItem('events'))
  })
  this.timerID = setInterval(
    () => this.tick(),
    3600000
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
//
//
componentWillUpdate(nextProps,nextState){
  localStorage.setItem('events',JSON.stringify(this.state.events));
}
//
// componentDidMount(){
//   if
// }

handleClick(day,i) {
  this.setState(function(state){
    state.events[day].splice(i,1);
    return state;
  })
}

 handler(day,event){
   this.setState(function(state){
     state.events[day].push(event);
     console.log(state);
     return state;
   })
 }



  render(){
    for(var elm of this.props.days){
      if(elm.type === "yesterday"){
        console.log(elm);
        elm = [];
      }
    }

   return (
      <div key = {1} className="week">
        {this.props.days.map((d, i) => <Day date={i+ new Date().getDate()} handleClick={this.handleClick.bind(this)} handler={this.handler} {...d} event={this.state.events[d.day]} key={i}/>)}
      </div>
    )
  };
}

export default Week;
