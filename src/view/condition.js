import { Component } from "react";
import { MapComponent } from "../mapTech/mapComponentInterface";

export default class Condition extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      
      let app = this.props.app
      let state = app.state
      let obj = this.props.obj
      let currentEncounter = state.currentEncounter
      let componentList = state.componentList
      let rulesetName = currentEncounter.getJson().ruleset
      let ruleset = componentList.getComponent("ruleset", rulesetName, "name")
      let conditionList = ruleset.getJson().conditionList.split(",")
      conditionList = conditionList.map(str => {
        let o ={type:"condition", name:str, component:obj, func:(participant)=>{
          debugger
          if(participant.getJson()[str]!==undefined &&participant.getJson()[str]!==""){
            participant.setCompState({[str]:""});
          }
          else{
            participant.setCompState({[str]:0})
          }
          state.opps.cleanPrepareRun({update:participant})

          
        }}
        return o;
      })
      return(
      <div>
        <MapComponent app={app} list={[obj]} cells={conditionList}/>
      </div>)
      }
  }
  