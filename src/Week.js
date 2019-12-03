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
    86400000
  );
  // chrome.storage.local.get("events", function(value) {
  //   this.setState({
  //     events:JSON.parse(value)
  //     })
    // })
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
  // chrome.storage.local.set({
  //    events: JSON.stringify(this.state.events)
  //  });
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
   //  chrome.storage.local.set({
   //   eventList: this.props.event.map(e => ({
   //     title: e.title,
   //     time: e.time,
   //     description: e.description,
   //     day: this.props.day
   //   }))
   // });
    for(var elm of this.props.days){
      if(elm.type === "yesterday"){
        console.log(elm);
        elm = [];
      }
    }
   return (

      <div key = {1} id="week">
        {this.props.days.map((d, i) => <Day  handleClick={this.handleClick.bind(this)} handler={this.handler} {...d} event={this.state.events[d.day]} key={i}/>)}
      </div>
    )
  };
}

export default Week;
