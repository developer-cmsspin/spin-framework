import { BaseHeader } from "./base/baseHeder";

/**
 * Header
 */
export  class Header extends BaseHeader{

    /**
     * Creates an instance of header.
     */
    public constructor() {
        super($("header"));
    }

    /**
     * Renders header
     */
    public Render(): void {
        
    }
    
}