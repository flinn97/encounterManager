import { Component } from "react";
import rollService from "../services/rollService";
import ParentFormComponent from "../componentListNPM/componentForms/parentFormComponent";
export default class Initiative extends Component {
    constructor(props){
      super(props);
  
      this.state={
        start:false
      }
    }
  
 
  
    render(){
      return(
        <div>
          {!this.props.obj.getJson().rollState?(<div onClick={()=>{
          let i = rollService.rollDice(20, this.props.obj.getJson().initiativeBonus)
          this.props.obj.setCompState({initiative:i, rollState:true})
          this.props.app.state.opps.cleanPrepareRun({update:this.props.obj})
        }}>roll</div>):(
          <div>
        <div><ParentFormComponent app={this.props.app} obj={this.props.obj} name="initiative" cleanPrepareRun={true}/></div>
        <div onClick={()=>{
          this.props.obj.setCompState({initiative:"",rollState:false})
          this.props.app.state.opps.cleanPrepareRun({update:this.props.obj})
          }}>X</div>
        </div>)}
        </div>
        
        )
      }
  }
  