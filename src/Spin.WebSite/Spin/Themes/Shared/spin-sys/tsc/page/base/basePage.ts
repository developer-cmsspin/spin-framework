import { BaseComponent } from "../../component/baseComponent";
/**
 * Clase base para cada pagina 
 */
export abstract class BasePageController {

    /**
     * constructor 
     */
    constructor() {

    }

    /**
     * Renders base page controller
     */
    public abstract Render():void; 

}