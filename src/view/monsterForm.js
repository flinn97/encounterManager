import { Component } from "react";
import ParentFormComponent from "../componentListNPM/componentForms/parentFormComponent";
import RunButton from "../componentListNPM/componentForms/buttons/runButton";


export default class MonsterForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      value : 0,
    }

  }


  render() {
    let app =this.props.app
    let state = app.state
    let dispatch = app.dispatch
    return (
      <div>
        <div onClick={()=>(dispatch({popUpSwitch: ""}))}>X</div>
        <ParentFormComponent app={app} name="name" label="Name" />
        <ParentFormComponent app={app} name="initiativeBonus" label="Initiative Bonus" />
        <ParentFormComponent app={app} name="armor" label="Armor Class" />
        <ParentFormComponent app={app} name="hitPoints" label="HP" />
        <ParentFormComponent app={app} name="statBlockLink" label="Stat Block Link" />
        <ParentFormComponent app={app} name="note" label="Notes" />
        <input onChange={(e)=>{
          let value = e.target.value;

         this.setState({value : value})
          console.log(e)
        }}></input>
        <div onClick={async ()=>{
          
          let json = state.currentComponent.getJson()
          for(let i=1; i<parseInt(this.state.value); i++){
            await state.opps.jsonPrepare({"addparticipant": {...json, _id:undefined}})
          }
          state.opps.run()
        }}>save</div>
        
      </div>
    )

  }
}
