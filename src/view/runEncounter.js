import { Component } from "react";
import play from "../pics/forward.png";
import pause from "../pics/pauseInit.png";


export default class RunEncounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false
    }

  }


  render() {
    let app = this.props.app
    let state = app.state
    let componentList = state.componentList
    let encounter = state.currentEncounter

    return (
      <div className="Run-Bar" style={{userSelect:"none"}}>
        {this.state.start === true && <div className="button Run-Button" onClick={async () => {
          debugger
          let participant = await encounter.getHighestParticipant(componentList);
          //get the ruleset for the current encounter see condition.js render function line 19 and 20 of example
          let currentRulesetName = state.currentEncounter.getJson().ruleset
          let ruleset = componentList.getComponent("ruleset", currentRulesetName, "name")
          participant.updateConditions(ruleset)

        }}>Next
        <img src={play} style={{width:"22px", marginLeft:"12px", marginBottom:"-5px"}}/>
        </div>}
        {this.state.start === false ? (<div
          className="button Run-Button"
          onClick={() => {
            encounter.getHighestParticipant(componentList)
            this.setState({ start: true })
          }}>Run Encounter
          
          </div>)

          :

          (<div 
            style={{color:"white", border:"1px solid red"}}
            className="button Run-Button"
            onClick={() => {
            encounter.clearParticipant()
            this.setState({ start: false })
            
          }}>Stop
          <img src={pause} style={{width:"18px", marginLeft:"12px", marginBottom:"-5px"}}/>
          </div>)}
        

      </div>
    )
  }

}
// class Component{
//   constructor(props){
//     this.props = props
//     this.state ={

//     }

//   }
//   setState(obj){
//     this.state = {...this.state,...obj}
//     this.render()
//   }
//   render(){
//     return <></>
//   }
// }