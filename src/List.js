import React from 'react';
import Task from './Task';

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[],
            alert:false
        }
        this.deleteTask  = this.deleteTask.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTask  = this.addTask.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
    // For each elm of tasks[], render <Task/>
      }
    componentWillMount(){
        localStorage.getItem('tasks') && this.setState({
          tasks:JSON.parse(localStorage.getItem('tasks'))
        })
    }
    componentWillUpdate(nextProps,nextState){
        localStorage.setItem('tasks',JSON.stringify(this.state.tasks));
      }

    // resetForm = () => { 
    // }
    handleSubmit(task){
        task.preventDefault();
        var taskObj = this.inputNode.value.split(',');
     
        this.setState(function(state){
                state.tasks.push({name:taskObj[0].trim(),type:taskObj[1]?taskObj[1].trim():""});
                console.log(state);
                return state;
            })

    } 
    setWrapperRef(node) {
        this.inputNode = node;
    }
    addTask(){
        this.setState(function(state){
            return state;
        })
    }

    deleteTask(i) {
    this.setState(function(state){
        state.tasks.splice(i,1);
        return state;
    })
    }

      render(){
        return (
            <div className="listContainer">
                <div className="taskContainer"> 
                    {
                        this.state.tasks.map((e,i)=>
                            <Task onClick={()=> this.deleteTask(i)} name={e.name} type={e.type?e.type:""}/>
                        )
                    }
                       
                </div>
                
                <form id="datForm" onSubmit={this.handleSubmit}><input ref={this.setWrapperRef} placeholder ="ToDo" className="taskInput" autoComplete="off" type='text'></input></form>

            </div>
         )
       }
}
export default List;