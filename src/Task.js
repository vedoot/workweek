import React from 'react';

function Task(props){
  return(
    <div onClick={props.onClick} className={"task " + props.type}>
        {props.name}
    </div>
  )
}


export default Task;