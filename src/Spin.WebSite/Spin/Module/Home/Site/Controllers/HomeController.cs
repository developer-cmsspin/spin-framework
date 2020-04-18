using Spin.Base.BaseController;
using Spin.Base.Helper;
using Spin.Base.Cache;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Threading;

using System;

using System.Linq;
using Spin.Security.API;
using Spin.WebSite;
using Spin.Connection.API;
using System.Collections.Generic;
using Spin.Modules.Helper.Injection;
using Spin.Security.Entity.Base;

namespace Spin.Modules.Home.Site.Controllers
{
    public class HomeController : SpinControllerSite
    {
        // GET: Home
        //[SpinCacheExecute(Duration =200)]
        public ViewResult Index()
        {
            //string UserInstance = SpinWebSiteCollection.SpinService.GetInstance<ISpinSecurity>().UserType.ToString();
            //var Data = FactoryConnectionDataBase.GetConnectionDataBaseGlobal(null, new List<string>() { UserInstance });
            return View();
        }

    }
}