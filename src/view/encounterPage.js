import { Component } from "react";
import GeneralInfo from "./generalInfo";
import MonsterForm from "./monsterForm";
import MonsterList from "./monsterList";
import RunEncounter from "./runEncounter";

export default class EncounterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
   
    render() {
        let app = this.props.app;
        let state = app.state;
        return (
            <div style={{display:"flex", alignItems:"center", flexDirection:"column", color:"white", background:"black"}}>

                <GeneralInfo app={app}/>
                {state.popUpSwitch === "addMonster" && state.currentComponent?.getJson().type==="participant" && <MonsterForm app={app}/>}

                <MonsterList app={app}/>
                <RunEncounter app={app}/>
            </div>
            
            )

    }

}