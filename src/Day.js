import React from 'react';
import DayContent from './DayContent'
// import { addEvent } from './Week.js'
class Day extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let event = this.props.event;
    if(event.length===0){
      event.push({title:"Nothing Today",time:"0:00",description:"Realax",type:"gray"});
    }
    console.log(this.props);
    return (
      <div className="day">
        <p onClick={()=>this.props.handler(this.props.day,{title:"fbgm",time:"All Day"})} id={this.props.day} className={"title " + this.props.type}>{this.props.day}</p>
        {event.map((e,i) => <DayContent type={e.type} title={'['+e.title+']'} time={'['+e.time+']'} description={e.description} key={i}/>)}
      </div>
    )
  };
}

export default Day;
