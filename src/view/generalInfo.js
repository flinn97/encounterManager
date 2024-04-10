import { Component } from 'react';

import DetailsDisplay from "./detailsDisplay";
import EncounterForm from "./encounterForm";

export default class GeneralInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    }

  }


  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let currentEncounter = app.state.currentEncounter;
    return (
      <div>
        <div>
          {currentEncounter.getJson().name}
        {this.state.edit === false && <div style={{color:"yellow"}} onClick={()=>(this.setState({edit:true}))}>edit</div>}
          {this.state.edit === false && <DetailsDisplay app={app}/>}
          {this.state.edit === true &&<div style={{color:"red"}} onClick={()=>(this.setState({edit:false}))}>X</div>}
          {this.state.edit === true && <EncounterForm app={app}/>}

        </div>
        <div style={{color:"yellow"}} onClick={() => (dispatch({ popUpSwitch: "addMonster", operate:"addparticipant", operation:"cleanJsonPrepare", object:{encounterId:currentEncounter.getJson()._id, type:"participant"}  }))}>
          Add Creature
        </div>
        <div onClick={()=>{currentEncounter.addCampaignPlayers(app.state.componentList.getList("participant", "player", "role"))}}>Add Players</div>
      </div>
    )
  }

}
