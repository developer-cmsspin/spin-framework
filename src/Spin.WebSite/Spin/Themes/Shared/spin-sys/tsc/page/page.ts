import { BasePageController } from "./base/basePage";
import { BaseHeader } from "./base/baseHeder";
import { BaseFooter } from "./base/baseFooter";
import { Header } from "./header";
import { Footer } from "./footer";

/**
 * Page controller
 */
export abstract class PageController extends BasePageController {
    /* #region  Controller */
    /**
     * Creates an instance of page controller.
     * @param [header] Object Header
     * @param [footer] Object Footer
     */
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