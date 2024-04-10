import BaseClass from "../componentListNPM/baseClass";
import React, {Component} from "react";
import { MapComponent } from "../mapTech/mapComponentInterface";
import Condition from "./condition";
import Initiative from "./initiativeRoll";
import ProfilePic from "./profilePic";
import AttributeMap from "./attributeMap";
import Name from "./name";
 
export default class MonsterList extends Component {
    constructor(props){
      super(props);
  
  
    }
  // 
  
    render(){
      let app = this.props.app;
      let state = app.state;
      console.log(state);
      return(
        <MapComponent type="monsterList" app={app} name="participant" cells={[{custom:Initiative, type:"custom"}, {custom:ProfilePic, type:"custom"},{custom:Name, type:"custom"},{custom:AttributeMap, type:"custom"},{custom:Condition, type:"custom"},"del" ]} filter={{search:state.currentEncounter?.getJson()._id,attribute:"encounterId"}}/>      )
      
    }
  }
  