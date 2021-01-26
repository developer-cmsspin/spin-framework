﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Spin.Base.Helper.Base;
using Spin.Connection.API;
using Spin.Connection.DAL;
using Spin.Modules.Helper.Injection;
using Spin.Security.Entity.Base;

namespace Spin.WebSite
{
	public class MigrationsContextWebsiteFactory : IDesignTimeDbContextFactory<DbContext>
	{ 
		public DbContext CreateDbContext(string[] args)
		{
			//Init Starup
			SignSpin.Sign();
			Startup StartSite = new Startup(null);
			StartSite.BuildServiceSpin();

			return FactoryConnectionDataBase.GetConnectionDataBaseGlobal() as DbContext;
		}
	}


}
