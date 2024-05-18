
import { Component } from 'react';
import { MapComponent } from '../mapTech/mapComponentInterface';

export default class DetailsDisplay extends Component{
    constructor(props){
      super(props);
  
  
    }

    convertStringToLink = (string) => {
      if (!string) return '';
    
      const trimmedString = string.trim();
      const hasProtocol = /^https?:\/\//i.test(trimmedString);
    
      return hasProtocol ? trimmedString : 'https://' + trimmedString;
    }
    
  
  
    render(){
      let app = this.props.app
      let state = app.state
      let encounter = state.currentEncounter

      let audioLink = convertStringToLink(encounter?.getJson().audio ? encounter.getJson().audio:encounter.getJson().audioLink);

      return(<div>
      <div className='info'>
        {encounter.getJson().description}
      </div>

      <a className='info'>
        {audioLink}
      </a>
      </div>)
      }
  }
  