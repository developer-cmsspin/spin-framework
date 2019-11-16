using Spin.Base.BaseController;
using Spin.Base.Helper;
using Spin.Base.Cache;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading;

using System;

using System.Linq;
using Spin.Security.API;


namespace Spin.Modules.Home.Site.Controllers
{
    public class HomeController : SpinControllerSite
    {
        // GET: Home
        //[SpinCacheExecute(Duration =200)]
        public ViewResult Index()
        {
            
            return View();
        }

    }
}