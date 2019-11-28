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
      }
    }
    this.handler  = this.handler.bind(this);
    // this.sort = this.handler.bind(this);
  }



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

   return (

      <div id="week">
        {this.props.days.map((d, i) => <Day  handleClick={this.handleClick.bind(this)} handler={this.handler} {...d} event={this.state.events[d.day]} key={i}/>)}
      </div>
    )
  };
}

export default Week;
