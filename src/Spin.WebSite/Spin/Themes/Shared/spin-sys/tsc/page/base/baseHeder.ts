export abstract class BaseHeader{

    /**
     * constructor 
     */
    constructor() {

    }

    
    private _contact : contact;
    public get contact() : contact {
        return this._contact;
    }
    public set contact(v : contact) {
        this._contact = v;
    }
    
    
}

export class contact{
    show(){

    }
}