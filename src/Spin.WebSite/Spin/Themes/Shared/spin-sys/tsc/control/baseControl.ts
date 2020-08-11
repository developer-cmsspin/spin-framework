/**
 * Base for create controls
 */
export abstract class BaseControl{
    public abstract Render():void; 

    /* #region  Constructor */
    public constructor(e:JQuery<HTMLElement>) {
        this.control = e;
    }
    /* #endregion */


    /* #region  Property */

    /* #region  Control */
    private _control: JQuery<HTMLElement>;
    public get control(): JQuery<HTMLElement> {
        return this._control;
    }
    public set control(v: JQuery<HTMLElement>) {
        this._control = v;
    }
    /* #endregion */

    /* #endregion */
}

