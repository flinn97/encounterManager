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
      <div style={{width: "fit-content", height: "160px", justifyContent:"center", display:"flex", flexDirection:"column" }}>
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
          <div>
            <div>
              <ParentFormComponent
                app={this.props.app}
                obj={this.props.obj}
                name="initiative"
                cleanPrepareRun={true}
                class="text-form text-small"
              />
            </div>
            <div
              onClick={() => {
                this.props.obj.setCompState({ initiative: "", rollState: false });
                this.props.app.state.opps.cleanPrepareRun({ update: this.props.obj });
              }}
            >
              X
            </div>
          </div>
        )}
      </div>


    )
  }
}
