import { Component } from "react";
import ParentFormComponent from "../componentListNPM/componentForms/parentFormComponent";

export default class Armor extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app= this.props.app
      return(
      <div>
        <ParentFormComponent app={app}  obj={this.props.obj} name="armor" label="AC" cleanPrepareRun={true} />
        </div>
        )
      }
  }
  