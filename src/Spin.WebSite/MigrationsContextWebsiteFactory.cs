using System;
using Microsoft.EntityFrameworkCore.Design;
using Spin.Connection.API;
using Spin.Connection.DAL;

namespace Spin.WebSite
{
	public class MigrationsContextWebsiteFactory : IDesignTimeDbContextFactory<SpinGlobalContext>
	{
		public SpinGlobalContext CreateDbContext(string[] args)
		{
			return FactoryConnectionDataBase.GetConnectionDataBaseGlobal();
		}
	}


}
