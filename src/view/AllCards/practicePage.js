import { Component } from 'react';
import "../../App.css"
import AllCardsList from './AllCardsList';
import ViewCard from './ViewCard';
import CardListInRoutine from '../routine/cardListInRoutine';
// import FamilyFactory from '../practice/familyFactory';
import { forFactory } from '../../models/myComponents';
import FamilyMap from '../practice/familyMap';
import EngineInterface from '../practice/engineInterface';
// import mummy from "../pics/runesTest1/2red.png";
// import kinstone from "../pics/runesTest1/1red.png";

export default class PracticePage extends Component {
  interface;
  constructor(props) {
    super(props);
    this.dispatch=this.dispatch.bind(this)
    this.register=this.register.bind(this)
    this.state = {
      obj: undefined,
      start:false,
      
      
    }

  }



  componentDidMount() {
    //create singleton factory
    if (this.interface === undefined) {
      this.interface = new EngineInterface(this.dispatch)
    }
    let list = this.interface.getCompList()
    this.register("family");
    this.register("person");
    this.setState({start:true, list:list, interface:this.interface})
  }

  dispatch(obj){
    this.setState({...obj})
  }

  register(type){
    let option = forFactory()[type]
    //register a new class inside family factory
    this.interface.getFactory().registerComponents({ name: type, component: option })
  }

  render() {
    let app = { ...this.props.app };
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;
    let opps = state.opps
    let center = window.innerWidth < state.phoneUIChange ? {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    } : undefined


    return (
      <div>
        {this.state.start&&<>

        <div style={{ color: "white" }} onClick={() => {
           this.state.list.addComp("family")

        }}>add family</div>
 
             
        <FamilyMap app={app} factory={this.factory} name="person" type='family' state={this.state} list={this.state.list}/>
       </>}
      </div>

    )

  }
}
