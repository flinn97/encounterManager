import FamilyFactory from "./familyFactory";
import CompList from "./compList";

export default class EngineInterface{
    factory;
    dispatch;

    constructor(dispatch){
        this.getFactory =  this.getFactory.bind(this)
        this.dispatch = dispatch;
        this.getFactory();
    }
    getCompList(){
        return new CompList(this.factory,this.dispatch);

    }
    getFactory(){
        if(this.factory === undefined){
            this.factory = new FamilyFactory();
        }
        return this.factory;
    }

}