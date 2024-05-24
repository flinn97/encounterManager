import { Component } from "react";
import ParentFormComponent from "../componentListNPM/componentForms/parentFormComponent";
import RunButton from "../componentListNPM/componentForms/buttons/runButton";


export default class MonsterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }

  }


  render() {
    let app = this.props.app
    let state = app.state
    let dispatch = app.dispatch
    return (
      <div className='Header-Enc' style={{ width: "80%", padding: "13px", marginTop:"10px" }}>
        <div className='button Close-Button' onClick={() => (dispatch({ popUpSwitch: "" }))} style={{alignSelf:"flex-end"}}>X</div>
        <ParentFormComponent app={app} name="name" label="Name" labelClass="label" class="text-form text-wide" />
        <ParentFormComponent app={app} name="initiativeBonus" label="Initiative Bonus" labelClass="label" class="text-form text-wide" />
        <ParentFormComponent app={app} name="armor" label="Armor Class" labelClass="label" class="text-form text-wide" />
        <ParentFormComponent app={app} name="hitPoints" label="HP" labelClass="label" class="text-form text-wide" />
        <ParentFormComponent app={app} name="statBlockLink" label="Stat Block Link" labelClass="label" class="text-form text-wide" />
        <ParentFormComponent app={app} name="note" label="Notes" labelClass="label" class="text-form text-wide" />
        <div className="label">
          Number to create</div>
        <input className="text-form text-wide" style={{marginBottom:"11px"}} onChange={(e) => {
          let value = e.target.value;

          this.setState({ value: value })
          console.log(e)
        }}></input>
        <div className="button Add-New-Creature-Button"  onClick={async () => {

          let json = state.currentComponent.getJson()
          for (let i = 1; i < parseInt(this.state.value); i++) {
            await state.opps.jsonPrepare({ "addparticipant": { ...json, _id: undefined } })
          }
          dispatch({ popUpSwitch: "" });
          state.opps.run()
        }}>Create</div>

      </div>
    )

  }
}
