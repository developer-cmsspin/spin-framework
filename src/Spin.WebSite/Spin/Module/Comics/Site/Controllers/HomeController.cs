using Spin.Base.BaseController;
using Spin.Base.Helper;
using Spin.Base.Cache;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading;

using System;

using System.Linq;
using Spin.Security.API;
using Spin.WebSite.Spin.Module.Comics.Core.BL;

namespace Spin.Modules.Comics.Site.Controllers
{
    public class HomeController : SpinControllerSite
    {
        // GET: Home
        //[SpinCacheExecute(Duration =200)]
        public ViewResult Index()
        {

            ComicBL BL = new ComicBL();
            return View(BL.SelectAll().ToList());
        }

    }
}