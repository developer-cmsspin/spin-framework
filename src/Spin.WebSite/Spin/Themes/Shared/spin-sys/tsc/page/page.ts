import { BasePageController } from "./base/basePage.js";
import { BaseHeader } from "./base/baseHeder.js";
import { BaseFooter } from "./base/baseFooter.js";
import { Header } from "./header.js";
import { Footer } from "./Footer.js";

export abstract class PageController extends BasePageController {
    /* #region  Controller */
    constructor(header: BaseHeader = null, footer: BaseFooter = null) {
        super();

        this.header = header ?? new Header();
        this.footer = footer ?? new Footer();
    }
    /* #endregion */

    /* #region  Header */
    private _header: BaseHeader;
    public get header(): BaseHeader {
        return this._header;
    }
    public set header(v: BaseHeader) {
        this._header = v;
    }
    /* #endregion */



    /* #region  Footer */
    private _footer: BaseFooter;
    public get footer(): BaseFooter {
        return this._footer;
    }
    public set footer(v: BaseFooter) {
        this._footer = v;
    }
    /* #endregion */
}