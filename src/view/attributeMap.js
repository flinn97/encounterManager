import { Component } from "react";
import Armor from "./armor";
import { MapComponent } from "../mapTech/mapComponentInterface";
import HitPoints from "./hitPoints";
import ParticipantNotes from "./participantNotes";

export default class AttributeMap extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app = this.props.app
      return(
      <div>
        <Armor/>
        <HitPoints/>
        <ParticipantNotes/>
        
        {/* <MapComponent name="participant" cells={[{custom:Armor, type:"custom"},{custom:HitPoints, type:"custom"},{custom:ParticipantNotes, type:"custom"}]}/> */}
        </div>
        )
      }
  }
  