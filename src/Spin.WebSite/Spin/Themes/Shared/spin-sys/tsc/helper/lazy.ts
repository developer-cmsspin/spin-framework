export interface ILazyInitializer { 
    CreateInstance():ILazyInitializer;
}

export class Lazy<T extends ILazyInitializer>{
    private instance: T | null = null; 
    private initializer: (new () => T); 
    private from:string;
    
  
    constructor(from:string="") { //initializer:new () => T
        this.from = from;
    } 
  
    public get value(): T { 
        if (this.instance == null) { 
            this.instance = new this.initializer(); 
        } 
  
        return this.instance; 
    } 

}