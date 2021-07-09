using Microsoft.AspNetCore.Mvc;
using Spin.Base.BaseController;

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