using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Spin.Base.Helper.Base;
using Spin.Connection.API;

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
