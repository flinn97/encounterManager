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
        <ParentFormComponent app={app}  obj={this.props.obj} name="hitPoints" label="HP" cleanPrepareRun={true} 
        inputStyle={{width:"80px"}} wrapperStyle={{display:"flex", flexDirection:"column"}}
        class="text-form text-small" labelStyle={{fontFamily:"inria", marginLeft:"42px"}}
        />
        </div>
        )
      }
  }
  