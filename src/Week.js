import React from 'react';
import Day from './Day';
import './index.css';

var date = new Date();
var events = {
  Mon:[],
  Tue:[],
  Wed:[],
  Thur:[],
  Fri:[],
  Sat: [],
  Sun:[],
};

function Week() {
//maps days to day objects
  let days = ["Sun", 'Mon', "Tue", "Wed", "Thur", "Fri", "Sat"].map((day, i) => ({ day, dayCode: i }));

//rotates days
    while(true){
      const elm = days[0];
      if (elm.dayCode === date.getDay()){
         elm.type="today";
         break;
       }
      days.push(days.shift());
    }

  return (
    <div id="week">
      {days.map((d, i) => <Day {...d} event={events[d.day]} key={i}/>)}
    </div>
  );
}


export function addEvent(day){
  events[day].push({title:"title",time:"000",description:"short"});
}
export default Week;
