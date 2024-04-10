

/**
 * Create a factory that can add all the components
 */
class HappyBirthdayObserver {
     

    funcList =[]
       

    
        /**
     * 
     * @param register 
     * register any function to the list
     */
    subscribe(func){
        this.funcList.push(func)
    }
    
    runObserver(_id){
        
        for(let func of this.funcList){
        func(_id);
        }        
        
        
    }
}
export default HappyBirthdayObserver;