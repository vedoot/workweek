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
    this.sortEvents = this.sortEvents.bind(this);
    this.resetShit = this.resetShit.bind(this);
  }

  renderInput(){
    this.setState({
      add:true
    })
  }


  handleSubmit(event){
      event.preventDefault();
      var eventObj = this.inputNode.value.split(',');

      if(eventObj.length<1 || eventObj[0]===""){
        this.setState({
          alert:true
        })
      }
      else{
      if(eventObj[3]===undefined){
          eventObj[3]="regular";
        }
      if(eventObj[2]===undefined){
        eventObj[2]=" ";
      }
      if(eventObj[1]===undefined|| eventObj[1]===' ' || eventObj[1]===''){
        eventObj[1]="00:00AM"
      }
      this.props.handler(this.props.day,{title:eventObj[0].trim(),time:eventObj[1].trim(),description:eventObj[2].trim(),type:eventObj[3].trim().toUpperCase()});
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

  setGray(){
    var date = new Date().toLocaleTimeString();
    if(date.substring(0,2).includes(':')){
      date = '0'+date;
    }
    if(date.includes("PM")){
      if(date.substring(0,2)==='12'){
        date = '12'+date.substring(2);
      }
      else{
      var x = parseInt(date.substring(0,2)) + 12;
      date = x + date.substring(2);
    }
    }
    if(date.includes("AM")){
      if(date.substring(0,2)==='12'){
        date = '00'+date.substring(2);
      }
    }

    date = date.replace('PM', "");
    date = date.replace('AM', "");
    date = date.substring(0, date.length - 4);
    date = date.replace(':', "");
    // console.log(date);

    if(this.props.type ==="today "){
        for(var elm of this.props.event){
            var str = elm.time;
            if(str.includes("PM")){
              if(str.substring(0,2)==='12'){
                str = '12'+str.substring(2);

              }
              else{
                var x = parseInt(str.substring(0,2)) + 12;
                str = x + str.substring(2);
              }
            }
            if(str.includes("AM")){
              if(str.substring(0,2)==='12'){
                str = '00'+str.substring(2);

              }
              // else{
              //   var x = parseInt(str.substring(0,2)) + 12;
              //   str = x + str.substring(2);
              // }
            }
        
            str = str.replace('PM', "") ;
            str = str.replace('AM', "") ;
            str = str.replace(':','')
            if(parseInt(str)< parseInt(date)){
              elm.type =elm.type + " finished";
              console.log("STR: "+ parseInt(str) + " Date:"+parseInt(date));
            }
            else{
              elm.type = elm.type.replace("finished", "");
            }
          
            

        }

      }


  }


  sortEvents(){
    this.props.event.sort(function(a,b){
      a.time.toLowerCase();
      b.time.toLowerCase();
      var t1,t2="";
      if(a.time.charAt(1)===':'){
        a.time = '0'+a.time;
      }
      if(b.time.charAt(1)===':'){
        b.time = '0'+b.time;
      }

      // TODO: ew. Rewrite this garbage pls
      var rn = new Date();
      var changedA = false;
      var changedB =false;
      if(a.time.includes("PM")||!a.time.includes("AM")){
        if(a.time.substring(0,2)==='12'){
          a.time='00'+a.time.substring(2);
          changedA=true;
        }
        if(!a.time.includes("PM")){
            a.time = a.time + "PM";
        }
        var add12 = parseInt(a.time.substring(0,2))
        t1= add12+12 + a.time.substring(2,a.time.length-2);
        // console.log("T1:" + t1);
      }
      else{
        t1 = a.time.substring(0,a.time.length-2);
      }
      if(b.time.includes("PM")||!b.time.includes("AM")){
        if(b.time.substring(0,2)==='12'){
          b.time='00'+b.time.substring(2);
          changedB=true;

        }
        if(!b.time.includes("PM")){
          b.time = b.time + "PM";
        }
        var add122 = parseInt(b.time.substring(0,2))
        // console.log(add122);
        t2= add122+12 + b.time.substring(2,b.time.length-2);
        // console.log("T2:" + t2);
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
      // console.log(this.props);
      return x.getTime() - y.getTime()
    });
  }
  resetShit(){
   if(this.props.type==="yesterday"){
     for(var elm of this.props.event){
       elm.type = elm.type.replace("finished", "");

     }
   }
  }

  render(){
    // console.log(this.props);
    this.sortEvents();
    this.setGray();
    this.resetShit();
    let event = this.props.event;

    let def ={};
    let dayTitle = <p onClick={()=> this.props.sort(this.props.day),this.renderInput} className={"title " + this.props.type + this.props.day}>{this.props.day}<p className="date">{this.props.date> 9 ? "" + this.props.date: "0" + this.props.date}</p></p>;
    if (this.state.add){
      dayTitle = <form onSubmit={this.handleSubmit}><input autoFocus name="event" ref={this.setWrapperRef} placeholder="Title,Time,Descr,Priority" className="input" autoComplete="off" type='text'></input></form>
    }
    let alert =null;
    if(this.state.alert){
      alert = <div className="alert">Read the instructions <br/>dummy</div>
    }
    if(event.length === 0){
      def = {title:"Nothing Today",time:"0:00",description:"Relax",type:"gray"};

      return(
        <div className="day">
          {dayTitle}
          <DayContent title={def.title} time={def.time} description={def.description} type={def.type}/>
          {alert}
        </div>
      )

    }
    return (
      <div className="day">
        {dayTitle}

        {
          event.map((e,i) =>
            <DayContent
              type={e.type}
              title={'['+e.title+']'}
              time={e.time!==undefined?'['+e.time+']':'[All Day]'}
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


}

export default Day;
