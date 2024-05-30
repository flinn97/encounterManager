import { Component } from "react";

export default class ProfilePic extends Component {
    constructor(props){
      super(props);
  
  
    }
  
  
    render(){
      let app= this.props.app
      return(
        // DELETE ALL OF THIS PLACEHOLDER
      <div style={{marginLeft:"-2.0vw", width:"5.4vw",}}>
        <div style={{background:"#ffdead", width:"5.4vw", height:"5.4vw", borderRadius:"50%", border:"2px solid grey", }} >
        <img src={this.props.obj.getJson().picURL} />
        </div>
        </div>)
      }
  }
  