import { Component } from 'react';
import "../../App.css"
import AllCardsList from './AllCardsList';
import ViewCard from './ViewCard';
import CardListInRoutine from '../routine/cardListInRoutine';

// import mummy from "../pics/runesTest1/2red.png";
// import kinstone from "../pics/runesTest1/1red.png";

export default class AllCardsWithView extends Component {
  constructor(props) {
    super(props);
      this.state={
        obj: undefined
      }

  }
  async componentDidMount(){
    let app = {...this.props.app};
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let recipe = componentList.getComponent("recipe");
    if(recipe){
      await dispatch({currentCard:recipe})
      this.setState({start:true})
    }
    else{
      this.setState({start:true})

    }
  }

  
  
  

  render() {
    let app = {...this.props.app};
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    let opps = state.opps
    let center = window.innerWidth<state.phoneUIChange? {
      display: "flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
    }: undefined


    return (
      <div style={{...center, width:"100vw", height:"100vh", display:"flex", flexDirection:"row", justifyContent:"space-around"}} >
       {this.state.start&&(<>
        {window.innerWidth>state.phoneUIChange?(<>
        <AllCardsList app={app} type="cardWithTab" options={{tabType:"colorTabWhite", cardType:"tallCard"}}/>
        
        <ViewCard app={app} type="cardWithTab" options={{tabType:"colorTabWhite",  cardType:"biggerCard"}}/>
        </>):(<>
        {state.showCard?(<ViewCard app={app} type="cardWithTab" options={{tabType:"colorTabWhite",  cardType:"biggerCard"}}/>):( <AllCardsList app={app} type="cardWithTab" options={{tabType:"colorTabWhite", cardType:"tallCard"}}/>)}</>)}
        </>)}
      </div>
    )

  }
}
