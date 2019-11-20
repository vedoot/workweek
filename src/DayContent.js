import React from 'react';

function DayContent(props){
  return(
    <div id={props.type} className="dayContent">
      <div id={props.type} className="eventTitle">{props.title}</div>
      <div id={props.type}  className="eventTime">{props.time}</div>
      <div id={props.type}  className="eventDesc">{props.description}</div>
    </div>
  )
}


export default DayContent;
