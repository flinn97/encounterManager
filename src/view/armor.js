import { Component } from "react";
import ParentFormComponent from "../componentListNPM/componentForms/parentFormComponent";
import ac from "../pics/ac.png";

export default class Armor extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app= this.props.app
      return(
      <div>
        <img src={ac} style={{width:"1rem", marginLeft:"32.25px"}}/>
        <ParentFormComponent app={app}  obj={this.props.obj} name="armor" cleanPrepareRun={true} 
        wrapperStyle={{display:"flex", flexDirection:"column"}}
        class="text-form text-small" inputStyle={{width:"55px"}} />
        </div>
        )
      }
  }
  