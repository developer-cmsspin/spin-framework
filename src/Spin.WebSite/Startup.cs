using System;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Spin.Base.Company.Entity;
using Spin.Base.Helper.Base;
using Spin.Connection.API;
using Spin.Connection.DAL;
using Spin.Connection.DAL.Provider.SQLServer;
using Spin.Diagnostics.API.DiagnosticLog.Providers.Console;
using Spin.Diagnostics.API.DiagnosticLog.Providers.Database;
using Spin.Diagnostics.API.DiagnosticLog.Providers.MongoDB;
using Spin.Diagnostics.Entity.DiagnosticLog;


namespace Spin.WebSite
{
    /// <summary>
    /// Startup.
    /// </summary>
    public class Startup: SpinStartup
    {
        #region Startup
        /// <summary>
        /// Initializes a new instance of the <see cref="T:Spin.WebSite.Startup"/> class.
        /// </summary>
        /// <param name="configuration">Configuration.</param>
        public Startup(IConfiguration configuration)
            :base(configuration)
        {
            //this.GeolocationProvider = new GeolocationProviderMaxMind(108786, "Xyh7mpdICkuS");
            //this.AddProviderDiagnosticLog(new MongoProviderDiagnostics());
            //this.AddProviderDiagnosticLog(new RaygunProviderDiagnostics());//RaygunProviderDiagnostics
            //this.AddProviderDiagnosticLog(new ConsoleProviderDiagnostics(TypeMessage.Error));

            //[Sample] Active Logs detail 
            //ScheduleTaskFactory.EnabledLogs = true;

        }
        #endregion

    }
}
