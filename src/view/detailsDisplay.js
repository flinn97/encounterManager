
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
      <div className='info'>
        {encounter.getJson().description}
      </div>

      <div className='info'>
        {encounter.getJson().audioLink}
      </div>
      </div>)
      }
  }
  