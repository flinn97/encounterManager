import React, { Component } from 'react';
import "../../App.css"
import MapComponent from '../../componentListNPM/mapTech/mapComponent';
import ParentFormComponent from '../../componentListNPM/componentForms/parentFormComponent';
import FormWithUpdateAndRun from '../../componentListNPM/componentForms/buttons/formWithUpdateAndRun';

import ViewMedia from '../../componentListNPM/componentForms/media/viewMediaComponent';
import { async } from 'videojs-record';
import arr from '../../pics/dreamArrow.png'
import './calendar.css';

/**
 * condensed version of the cards.
 * Works with themes.
 * props
 * theme
 * type
 * app
 * options
 * options can include cardType, cardContent, tabType, 
 */
export default class Schedule extends Component {
  constructor(props) {
    super(props);
    

  }

  /**
   * 
   * OPTIONS
   */


  render() {
    let app = {...this.props.app};
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    
    if(this.props.theme){
      if(Object.prototype.toString.call(this.props.theme) === "[object String]"){
        styles = state.themeFactory.getThemeFactory()[this.props.theme];
      }
      else{
        styles= this.props.theme;
      }
    }
    app.state.styles=styles
    




    //********CARD ASSIGN********/

    let cards={

      card: <Card app={{...app, state:{...app.state, styles:styles} }} options={this.props.options} type={this.props.type}/>,
      cardWithTab: <CardWithTab app={{...app, state:{...app.state, styles:styles}}} options={this.props.options} type={this.props.type}/>,
      popup: <Popup app={{...app, state:{...app.state, styles:styles} }} handleClose={this.props.handleClose}  options={this.props.options} type={this.props.type}/>,
      popupWithTab: <PopupWithTab app={{...app, state:{...app.state, styles:styles}}} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type}/>
//popupType={this.props.popupType} popupTab={this.props.popupTab}
    
    }
    
    //*********CARD ASSIGN********/





    return (
      <div >
        
        {cards[this.props.type? this.props.type: "card"]}
        </div>

    )
  }
}



//********CONTENTS********/
class MainContent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
    }
  
  }
  
  
  
 
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    const { currentDate } = this.state;

    // Get the current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get the first day of the current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Calculate the number of days from the previous month to display
    const daysFromPrevMonth = firstDayOfMonth.getDay();

    // Create an array to hold the calendar days
    const calendarDays = [];

    // Loop through the previous month's days
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const prevMonthDate = new Date(currentYear, currentMonth, 0 - i + 1);
      calendarDays.push(<div key={`prev${i}`} className="calendar-day prev-month-day">{prevMonthDate.getDate()}</div>);
    }

    // Loop through the current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentMonthDate = new Date(currentYear, currentMonth, i);
      calendarDays.push(<div key={`current${i}`} className="calendar-day current-month-day">{i}</div>);
    }

    // Loop through the next month's days
    const daysFromNextMonth = 35 - calendarDays.length;
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const nextMonthDate = new Date(currentYear, currentMonth + 1, i);
      calendarDays.push(<div key={`next${i}`} className="calendar-day next-month-day">{nextMonthDate.getDate()}</div>);
    }

    return (
      <div className="calendar" style={{width:"97%"}}>
        <div className="calendar-header" style={{width:"100%"}}>
          <div className="calendar-month" style={{width:"100%"}}>{currentDate.toLocaleString('default', { month: 'long' })} {currentYear}</div>
        </div>
        <div className="calendar-body" style={{width:"100%"}}>
          <div className="calendar-row" style={{width:"100%"}}>
            <div className="calendar-day-header">Sun</div>
            <div className="calendar-day-header">Mon</div>
            <div className="calendar-day-header">Tue</div>
            <div className="calendar-day-header">Wed</div>
            <div className="calendar-day-header">Thu</div>
            <div className="calendar-day-header">Fri</div>
            <div className="calendar-day-header">Sat</div>
          </div>
          <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", width:"100%"}}>
          {calendarDays.map((day,index) =>
            <div style={{width:"200px", height:"130px", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}} >
              <div style={{width:"100%"}} onClick={()=>{dispatch({popupSwitch:"scheduleRecipe", day:index})}}>{day}</div>
            <div>
                <MapComponent app={app} name="scheduledRecipe" filter={{search:index, attribute:"day"}} cells={["name","delete"]} delOptions={{name:"X"}}
                //Add a function with this popup func    app.setPopup({ operation: "cleanPrepare", operate: "update", object: comp }, "viewScheduledRecipe")
                functions={{cells:[0], functions:[(comp)=>{app.setPopup({operation: "cleanPrepare", operate: "update", object: comp, currentCard:comp}, "viewScheduledRecipe")}]}}
                //Make sure you can see full recipe on the popup
                
                  />
              </div></div>
            )}
            </div>
        </div>
      </div>
    );
  }
}


class TabContent extends Component{
  constructor(props) {
    super(props);

  }
  
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    const { currentDate } = this.state;

    // Get the current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get the first day of the current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Calculate the number of days from the previous month to display
    const daysFromPrevMonth = firstDayOfMonth.getDay();

    // Create an array to hold the calendar days
    const calendarDays = [];

    // Loop through the previous month's days
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const prevMonthDate = new Date(currentYear, currentMonth, 0 - i + 1);
      calendarDays.push(<div key={`prev${i}`} className="calendar-day prev-month-day">{prevMonthDate.getDate()}</div>);
    }

    // Loop through the current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentMonthDate = new Date(currentYear, currentMonth, i);
      calendarDays.push(<div key={`current${i}`} className="calendar-day current-month-day">{i}</div>);
    }

    // Loop through the next month's days
    const daysFromNextMonth = 35 - calendarDays.length;
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const nextMonthDate = new Date(currentYear, currentMonth + 1, i);
      calendarDays.push(<div key={`next${i}`} className="calendar-day next-month-day">{nextMonthDate.getDate()}</div>);
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <div className="calendar-month">{currentDate.toLocaleString('default', { month: 'long' })} {currentYear}</div>
        </div>
        <div className="calendar-body">
          <div className="calendar-row">
            <div className="calendar-day-header">Sun</div>
            <div className="calendar-day-header">Mon</div>
            <div className="calendar-day-header">Tue</div>
            <div className="calendar-day-header">Wed</div>
            <div className="calendar-day-header">Thu</div>
            <div className="calendar-day-header">Fri</div>
            <div className="calendar-day-header">Sat</div>
          </div>
          {calendarDays.map(day => day)}
        </div>
      </div>
    );
  }
}

/**Popups */
class Popup extends Component{
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
}
componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
}
handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
       this.props.handleClose();
    }
}
  
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    return(
      <div className="popup-box" style={{ zIndex: "1010" }}>
      <div ref={this.wrapperRef}  className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType? this.props.options?.cardType:"biggestCard"] }}>
      <div style={ ///EXIT BUTTON
                      styles.buttons.closeicon
                  } onClick={this.props.handleClose}>x</div>
          
          <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app} />
        </div>
          
      
      </div>



      </div>
    )
  }
}
class PopupWithTab extends Component{
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
}
componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
}
handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
       this.props.handleClose();
    }
}
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    return(
      <div  className="popup-box" style={{ zIndex: "1010" }}>
      <div ref={this.wrapperRef}  className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType? this.props.options?.cardType:"biggestCard"]  }}>
      
      <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"]}}> <TabContent app={app} /> <div style={ ///EXIT BUTTON
                      styles.buttons.closeicon
                  } onClick={this.props.handleClose}>x</div></div>   
      <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app} />
        </div>
        </div>
        



      </div>
    )
  }
}
  




//********CARDs********/
class Card extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return(
      <div className='scroller'  style={{ ...styles[this.props.options?.cardType?this.props.options?.cardType:"biggestCard"] }}>   
            <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
              <MainContent app={app} />
            </div>
      </div>
    )
  }
}

class CardWithTab extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return(
      <div  style={{...styles[this.props.options?.cardType?this.props.options?.cardType:"biggestCard"], width:window.innerWidth<state.phoneUIChange?"70vw":"35vw", position:'relative' }}>   
      <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"], height:"100px"}}> <TabContent app={app} /></div>   
      <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"], height:"85%"}} className='scroller'>
        <MainContent app={app} />
        </div>
        <div onClick={()=>{
          debugger
          let list = state.showPersonRoutine?componentList.getList("card", state.currentStudent.getJson()._id, "studentID"): (state.showCard &&!state.showRoutine)?componentList.getList("card", false, "studentCard"): componentList.getList("assignedCard", state.currentRoutine.getJson()._id, "routineID");
          let index = state.currentCard? list.indexOf(state.currentCard): 0;
          let newComp= undefined
          if(index===0){
            newComp= list[list.length-1];
          }
          else{
            newComp = list[index-1]
          }
          dispatch({currentCard:newComp});
         
        }}
         style={{background:"white", borderRadius:"50%", width:"70px", height:"70px", display:"flex", justifyContent:"center", alignItems:"center", position:"absolute", top:"50%", left:"-100px"}}><img src={arr} /></div>
        <div onClick={()=>{
          debugger
          let list = state.showPersonRoutine?componentList.getList("assignedCard", state.currentRoutine.getJson()._id, "routineID"): (state.showCard &&!state.showRoutine)?componentList.getList("card", false, "studentCard"): componentList.getList("assignedCard", state.currentRoutine.getJson()._id, "routineID");
          let index = state.currentCard? list.indexOf(state.currentCard): 0;
          let newComp= undefined
          if(list[index]===list[list.length - 1]){
            newComp= list[0];
          }
          else{
            newComp = list[index+1]
          }
          dispatch({currentCard:newComp});
         
        }} style={{background:"white", borderRadius:"50%", width:"70px", height:"70px", display:"flex", justifyContent:"center", alignItems:"center", position:"absolute", top:"50%", right:"-100px"}}><img style={{transform:"rotate(180deg)"}} src={arr} /></div>

        </div>
    )
  }
}
