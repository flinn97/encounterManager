import { Component } from 'react';
import HappyBirthdayObserver from './happyBirthdayObserver';

export default class FamilyMap extends Component{
    hbObserver
    constructor(props) {
      super(props);
      this.addComponentToList = this.addComponentToList.bind(this);
      this.wishHappyBirthdayIterator=this.wishHappyBirthdayIterator.bind(this)
      this.runHappyBirthdayObserver= this.runHappyBirthdayObserver.bind(this)
      this.state={}
    }

    componentDidMount(){
        if(this.hbObserver === undefined){
          this.hbObserver = new HappyBirthdayObserver()
        }
    }

    addComponentToList(type, obj){
      let listobj = this.props.list.addComp(type, obj)
      this.hbObserver.subscribe(listobj.birthdayMessage)
      this.setState({})
      return listobj;
      
    }

    wishHappyBirthdayIterator(_id, root, firstTime){
      
        if(root.getJson()._id!==_id&&firstTime){
          console.log("got here once")
          this.hbObserver.subscribe(root.birthdayMessage())
        }
        if(root.getJson().children.length>0){
          console.log(root.getJson().children.length);
          for(let c of root.getJson().children){
            if(root.getJson()._id!==_id){
              this.hbObserver.subscribe(this.props.state[this.props.name].filter(obj=> {return obj.getJson()._id===c})[0].birthdayMessage());
            }

          }
          for(let c of root.getJson().children){
            this.wishHappyBirthdayIterator(_id, this.props.state[this.props.name].filter(obj=> {return obj.getJson()._id===c})[0], false )

          }
        }

      
      }
      
      async runHappyBirthdayObserver(_id){
        let list = this.props.state[this.props.name].sort()
        for(let obj of list){
          obj.birthdayMessage();
        }
        // for(let obj of this.props.state[this.props.name]){
        //   this.hbObserver.subscribe(obj.birthdayMessage)
        // }
        // await this.hbObserver.runObserver(_id)
        this.setState({})
      }
    

    render(){
      let app = this.props.app;
      let dispatch = app.dispatch;
      let state = app.state;
      let componentList = state.componentList;
      let styles =state.styles;
      
  
      return(
      <div>
        {this.props.list?.getList(this.props.type)?.map((obj, index) =>
          <div key={index} style={{ color: "white" }}>{obj?.getJson()?.type}
          <div onClick={()=>{this.props.list.delComp(obj)}}>x</div>
          <div onClick={()=>{obj.setCompState({update:"hi"},()=>{this.setState({})})}}>Update: {obj.getJson().update}</div>
          <div onClick={()=>{this.addComponentToList(this.props.name, {familyID: obj.getJson()._id, name: "rootParent", message:"happy birthdat"})}}>Add First {this.props.name}</div>
          
          {this.props.list?.getList(this.props.name)?.map((ob, i) =>
          <div>
            
            <div>{ob.getJson()._id} {ob.getJson().name} {ob.getJson().parentID} {ob.getJson().currentMessage}</div>
            <div style={{display:'flex', flexDirection:"row"}}>
            <div onClick={()=>{this.props.list.delComp(ob)}}>x</div>
            <div onClick={async()=>{
              let json = {familyID: obj.getJson()._id, name: "rando", parentID: ob.getJson()._id, message:"happy birthdat"}
             let comp = await this.addComponentToList(this.props.name, json)
             let list = ob.getJson().children
             list.push(comp.getJson()._id)
             ob.setCompState({children: list})
             this.setState({})
            }}>Add child</div>
            <div onClick={()=>{
              this.runHappyBirthdayObserver(ob.getJson()._id);
              // this.wishHappyBirthdayIterator(ob.getJson()._id, this.props.state[this.props.name][0], true)
            this.setState({})}
          
            }>It's My birthday</div></div>
          </div>)}
          
            </div>)}
      </div>
      )
    }
  }