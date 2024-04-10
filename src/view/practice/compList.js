export default class CompList{
    components = [];
    sortedComponents = {}
    dispatch = undefined;
    factory = undefined;

    constructor(factory, dispatch){
        this.getComponents = this.getComponents.bind(this)
        this.addComp= this.addComp.bind(this)
        this.getFactory= this.getFactory.bind(this)
        this.getList = this.getList.bind(this)
        this.dispatch = dispatch
        this.factory = factory    
        
    }

    getComponents(){
        return this.components
    }
    addComp(type, json){
        let listobj = this.factory.getComponent({ component: type, json: json  })
        //use state machine to keep track of family objects added
        let list = this.sortedComponents[type]?[...this.sortedComponents[type], listobj]: [listobj];
        this.sortedComponents[type]= list;
        this.components.push(listobj)
        this.dispatch({lastUpdate:listobj});
        return listobj;
    }
    
    delComp(comp){
        let type = comp.getJson().type;
        let index = this.components.indexOf(comp);
        let index2 = this.sortedComponents[type].indexOf(comp);
        this.components.splice(index, 1);
        this.sortedComponents[type].splice(index2, 1);
        this.dispatch({lastUpdate:comp})
        return comp;

    }
    getFactory(){
        return this.factory
    }
    getList(type){
        // return this.components.filter(obj=>{return obj.getJson().type===type});
        return this.sortedComponents[type]
    }
} 