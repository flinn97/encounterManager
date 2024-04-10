
import { Component } from 'react';
import { MapComponent } from '../mapTech/mapComponentInterface';

export default class DetailsDisplay extends Component{
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app = this.props.app
      let state = app.state
      let encounter = state.currentEncounter
      return(<div>
      <MapComponent name="encounter" cells={["description"]} filter={{search:"", attribute:"encounterId"}}/>
      </div>)
      }
  }
  