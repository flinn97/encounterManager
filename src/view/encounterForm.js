import { Component } from "react";
import ParentFormComponent from "../componentListNPM/componentForms/parentFormComponent";


export default class EncounterForm extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app = this.props.app;
      return(
      <div>
        <ParentFormComponent obj = {app.state.currentEncounter} app={app} name="name" label="Encounter Name" prepareRun ={true}/>  
        <ParentFormComponent obj = {app.state.currentEncounter} app={app} name="description" label="Situation Description" prepareRun ={true}/>  
        <ParentFormComponent obj = {app.state.currentEncounter} app={app} name="audioLink" label="Audio Link" prepareRun ={true}/>  
        </div>)
      
      }
  }
  