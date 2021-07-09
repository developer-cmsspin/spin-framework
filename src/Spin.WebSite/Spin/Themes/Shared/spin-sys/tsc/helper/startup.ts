import { PageController } from "../../../../Shared/spin-sys/tsc/page/page";

/**
 * Startup Application
 */
export  class Startup{

    /**
     * Controller  of startup
     */
    private static  _controller : PageController;

    /**
     * Gets controller
     */
    public static get controller() : PageController {
        return Startup._controller;
    }
    /**
     * Sets controller
     */
    public static set controller(v : PageController) {
        Startup._controller = v;
    }
    
    /**
     * Starts startup
     * @param controller object extends to Page Controller
     */
    public static Start(controller:{ new (): PageController }){
        Startup._controller = new controller();
        Startup._controller.Render();
    }
}

export default Startup;