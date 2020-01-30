import React from 'react';

function Task(props){
  return(
    <div onClick={props.onClick}id={props.type} className="task">
        {props.name}
    </div>
  )
}


export default Task;