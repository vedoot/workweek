import React from 'react';
function DayContent(props){
  // console.log(props.type);

  return(
    <div onClick={props.onClick} key = {props.key} className={"dayContent " + props.type}>
      <div  className={"eventTitle " + props.type}>{props.title}</div>
      <div   className={"eventTime "+ props.type}>{props.time}</div>
      <div  className={"eventDesc "+ props.type}>{props.description}</div>
    </div>
  )
}


export default DayContent;
