/**
 * Base footer
 */
export abstract class BaseFooter{

    /**
     * Renders base footer
     */
    public abstract Render():void; 

    /* #region  Constructor */
    public constructor(e:JQuery<HTMLElement>) {
        this.container = e;
    }
    //==============CONTAINER==================
    /**
     * Control  of base component
     */
     private _container: JQuery<HTMLElement>;

     /**
      * Gets control
      */
     public get container(): JQuery<HTMLElement> {
         return this._container;
     }
     /**
      * Sets control
      */
     public set container(v: JQuery<HTMLElement>) {
         this._container = v;
     }
    //==============CONTAINER==================
    
}