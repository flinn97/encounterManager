import { Component } from "react";
import ParentFormComponent from "../componentListNPM/componentForms/parentFormComponent";

export default class Duplicate extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app= this.props.app
      let state= app.state
      return(
      <div onClick={()=>{
        debugger
        let json = this.props.obj.getJson();
        state.opps.cleanJsonPrepareRun({"addparticipant": {...json, _id: undefined, }})

      }}>
       Duplicate
        </div>
        )
      }
  }
  