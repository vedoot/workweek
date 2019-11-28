import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Week from './Week';
import Header from './Header';

import * as serviceWorker from './serviceWorker';

var date = new Date();
let days = ["Sun", 'Mon', "Tue", "Wed", "Thur", "Fri", "Sat"].map((day, i) => ({ day, dayCode: i }));

while(true){
  const elm = days[0];
  if (elm.dayCode === date.getDay()){
     elm.type="today";
     break;
   }
  days.push(days.shift());
}
ReactDOM.render([<Header/>,<Week days={days}/>], document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
