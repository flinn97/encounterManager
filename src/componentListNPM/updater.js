export default class Updater{
    componentUpdate={
        add:[],
        update:[],
        del:[]
    }
    getJson(){
        return this.componentUpdate;
    }
    setJson(json){
        this.componentUpdate=json;
    }
    setSelectedRegister(register, list){
        this.componentUpdate[register] = [...list];
    }
}