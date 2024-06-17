import { Component } from "react";
import rollService from "../services/rollService";
import ParentFormComponent from "../componentListNPM/componentForms/parentFormComponent";
import d20 from '../pics/d20.png';
export default class Initiative extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false
    }
  }

  render() {
    return (
      <div style={{width: "90px",}}>
      <div style={{ width:"fit-content", height: "160px", justifyContent: "center", display: "flex", alignContent: "center", marginLeft:"11px",
      alignItems: "center", flexDirection: "column" }}>
        {!this.props.obj.getJson().rollState ? (
          <div
            title="Roll Initiative"
            onClick={() => {
              let i = rollService.rollDice(20, this.props.obj.getJson().initiativeBonus);
              this.props.obj.setCompState({ initiative: i, rollState: true });
              this.props.app.state.opps.cleanPrepareRun({ update: this.props.obj });
            }}
          >
            <img className="roll-button" src={d20} alt="Roll Initiative" />
          </div>
        ) : (
          <div style={{  width:"fit-content", marginTop:"28px", height: "160px", justifyContent: "center", display: "flex", alignContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div 
            title="Edit Initiative"
            style={{ margin: "0", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <ParentFormComponent 
                app={this.props.app}
                obj={this.props.obj}
                name="initiative"
                cleanPrepareRun={true}
                class="text-form text-small"
                inputStyle={{marginLeft:"0px", fontSize:"1.5rem"}}
              />
              <div title="Clear Initiative" className="Close-Button btn-hightlight" style={{ width: "fit-content", fontSize: "1.44rem", marginTop: "11px", zIndex:"2", background:"none", }}
                onClick={() => {
                  this.props.obj.setCompState({ initiative: "", rollState: false });
                  this.props.app.state.opps.cleanPrepareRun({ update: this.props.obj });
                }}
              >
                X
               
              </div>
              <img className="roll-button" src={d20} alt="Roll Initiative" style={{display:"block", position:"relative", zIndex:"1", top:-18, left:-2,
              opacity:"11%",}} />
            </div>
          </div>
        )}
      </div></div>
    )
  }
}
