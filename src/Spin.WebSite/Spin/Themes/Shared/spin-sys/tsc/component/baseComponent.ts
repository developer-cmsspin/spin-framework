import { BaseControl } from "../control/baseControl";

/**
 * Base component
 */
export abstract class BaseComponent{

    /**
     * Renders base component
     */
    public abstract Render():void; 

    /**
     * Creates an instance of base component.
     * @param e control base
     */
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