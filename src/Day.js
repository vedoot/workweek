import React from 'react';
import DayContent from './DayContent'

class Day extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      add: false,
      alert:false
    }
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }



//renders input box when titl
  renderInput(){
    this.setState({
      add:true
    })
  }

//submits event form
  handleSubmit(event){

      event.preventDefault();
      var eventObj = this.inputNode.value.split(',');
      if(eventObj.length<3){
        this.setState({
          alert:true
        })
      }
      else{
      this.props.handler(this.props.day,{title:eventObj[0].trim(),time:eventObj[1].trim(),description:eventObj[2].trim()});
      this.setState({
        add:false,
        alert:false
      })
    }
    }


      componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
      }

      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }

      /**
       * Set the wrapper ref
       */
      setWrapperRef(node) {
        this.inputNode = node;
      }

      handleClickOutside(event) {
        if (this.inputNode && !this.inputNode.contains(event.target)) {
          this.setState({
            add:false,
            alert:false
          })
      }
    }

  render(){


    this.sortEvents();
    let event = this.props.event;
    // if(this.props.type==="yesterday"){
    //   event = [];
    // }
    let def ={};
    let dayTitle = <p onClick={()=> this.props.sort(this.props.day),this.renderInput} id={this.props.day} className={"title " + this.props.type}>{this.props.day}</p>;
    if (this.state.add){
      dayTitle = <form onSubmit={this.handleSubmit}><input autoFocus name="event" ref={this.setWrapperRef} placeholder="Title,Time,Description" id="input" autoComplete="off" type='text'></input></form>
    }
    let alert =null;
    if(this.state.alert){
      alert = <div id="alert">Read the instructions asshole </div>
    }
    if(event.length === 0){
      def = {title:"Nothing Today",time:"0:00",description:"Realax",type:"gray"};

      return(
        <div className="day">
          {dayTitle}
          <DayContent title={def.title} time={def.time} description={def.description} type={def.type}/>
          {alert}
        </div>
      )

    }



    // console.log(this.props);
    return (
      <div className="day">
        {dayTitle}

        {
          event.map((e,i) =>
            <DayContent
              type={e.type}
              title={'['+e.title+']'}
              time={e.time!=undefined?'['+e.time+']':'[All Day]'}
              description={e.description} key={i}
              onClick={() =>
                ( this.setState({
                  add:false,
                  alert:false
                }),
                this.props.handleClick(this.props.day,i))
              }/>
          )

      }
      {alert}
      </div>
    )
  };

sortEvents(){
  this.props.event.sort(function(a,b){
    a.time.toLowerCase();
    b.time.toLowerCase();
    var t1,t2="";
    if(a.time.charAt(1)===':'){
      a.time = '0'+a.time;
      console.log("yes");
    }
    if(b.time.charAt(1)===':'){
      b.time = '0'+b.time;
    }



    //if a or not b
    //p T F T F
    //q F T T F
    //ans T,F, T, T
var changedA = false;
var changedB =false;
    if(a.time.includes("PM")||!a.time.includes("AM")){
      if(a.time.substring(0,2)=='12'){
        a.time='00'+a.time.substring(2);
        changedA=true;
      }
      if(!a.time.includes("PM")){
          a.time = a.time + "PM";
      }
      var add12 = parseInt(a.time.substring(0,2))
      t1= add12+12 + a.time.substring(2,a.time.length-2);
      console.log("T1:" + t1);
    }
    else{
      t1 = a.time.substring(0,a.time.length-2);
    }
    if(b.time.includes("PM")||!b.time.includes("AM")){
      if(b.time.substring(0,2)=='12'){
        b.time='00'+b.time.substring(2);
        changedB=true;

      }
      if(!b.time.includes("PM")){
        b.time = b.time + "PM";
      }
      var add122 = parseInt(b.time.substring(0,2))
      console.log(add122);
      t2= add122+12 + b.time.substring(2,b.time.length-2);
      console.log("T2:" + t2);
    }
    else{
      t2 = b.time.substring(0,b.time.length-2);
    }

    if(changedA)
      a.time = '12'+a.time.substring(2);
    if(changedB)
      b.time='12'+b.time.substring(2);

    var x = new Date (new Date().toDateString() + ' ' + t1);
    var y = new Date (new Date().toDateString() + ' ' + t2);
    return x.getTime() - y.getTime()
  });
}

}

export default Day;
