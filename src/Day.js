import React from 'react';
import DayContent from './DayContent'
import { addEvent } from './Week.js'
function Day(props) {
  let event = props.event;
  if(event.length==0){
    event.push({title:"Nothing Today",time:"0:00",description:"Realax",type:"gray"});
  }

  return (
    <div className="day">
      <p onClick={()=> addEvent(props.day)} id={props.day} className={"title " + props.type}>{props.day}</p>
      {event.map((e,i) => <DayContent type={e.type} title={'['+e.title+']'} time={'['+e.time+']'} description={e.description} key={i}/>)}
    </div>
  );
}

export default Day;
