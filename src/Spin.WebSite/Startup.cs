﻿using Microsoft.Extensions.Configuration;
using Spin.Base.Helper.Base;
using Spin.Diagnostics.API.DiagnosticLog.Providers.Console;
using Spin.Diagnostics.Entity.DiagnosticLog;
using Spin.Helper.Injection;
using Spin.Helper.Session.Base;
using Spin.Themes.API;

namespace Spin.WebSite
{
    public class Startup: SpinStartup
    {
        #region Startup
        public Startup(IConfiguration configuration)
            :base(configuration)
        {
            this.AddProviderDiagnosticLog(new ConsoleProviderDiagnostics(TypeMessage.Error));



            
        }
        #endregion


        public override void ConfigureServiceSpin(SpinServiceCollection Service)
        {
            base.ConfigureServiceSpin(Service);
        }
    }

}
