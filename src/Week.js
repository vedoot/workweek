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
  }

//onclick set state
componentDidMount() {
  this.setState(function(state){
    return(state.events["Mon"].shift());
  })
 }

 handler(day,event){
   // alert("worked");
   this.setState(function(state){
     return(state.events[day].push(event||{title:"Event Title",time:"2:53",description:"This is a short description"}));
   })
 }




  render(){
   return (
      <div id="week">
        {this.props.days.map((d, i) => <Day handler={this.handler} {...d} event={this.state.events[d.day]} key={i}/>)}
      </div>
    )
  };
}

// export function addEvent(day){
//   events[day].push({title:"title",time:"000",description:"short"});
// }

export default Week;
