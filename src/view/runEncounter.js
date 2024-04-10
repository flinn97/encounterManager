import { Component } from "react";


export default class RunEncounter extends Component {
  constructor(props){
    super(props);
    this.state={
      start:false
    }

  }


  render(){
    let app = this.props.app
    let state = app.state
    let componentList= state.componentList
    let encounter = state.currentEncounter

    return(
      <div>
      {this.state.start === false ? (<div onClick={()=>{
        encounter.getHighestParticipant(componentList)
        this.setState({start:true})
        }}>run</div>):(<div onClick={()=>{encounter.clearParticipant()
          this.setState({start:false})
        }}>stop</div>)}
      {this.state.start === true && <div onClick={async ()=>{
        debugger
        let participant = await encounter.getHighestParticipant(componentList);
        //get the ruleset for the current encounter see condition.js render function line 19 and 20 of example
        let currentRulesetName = state.currentEncounter.getJson().ruleset
        let ruleset = componentList.getComponent("ruleset", currentRulesetName, "name")
        participant.updateConditions(ruleset)
        
      }}>next</div>}
     
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