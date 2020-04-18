using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Spin.Base.Core;
using Spin.Base.Documentation.DAL;
using Spin.Base.Helper.Base;
using Spin.Connection.API;
using Spin.Connection.DAL;
using Spin.Connection.Migration;
using Spin.Security.API;
using Spin.Security.Entity;


namespace Spin.WebSite
{
    /// <summary>
    /// Program Init
    /// </summary>
    public class Program : SpinProgram<Startup>
    {
        /// <summary>
        /// Main Call
        /// </summary>
        /// <param name="args"></param>
        public static void Main(string[] args)
        {
            CallMain(args);
        }

    }
}
