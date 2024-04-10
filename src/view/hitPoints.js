import { Component } from "react";
import ParentFormComponent from "../componentListNPM/componentForms/parentFormComponent";

export default class HitPoints extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app= this.props.app
      return(
      <div>
        <ParentFormComponent app={app}  obj={this.props.obj} name="hitPoints" label="HP" cleanPrepareRun={true} />
        </div>
        )
      }
  }
  