using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Spin.Modules.API.Base;
using Spin.WebSite.Spin.Module.Comics.Core.Entity;

namespace Spin.WebSite.Spin.Module.Comics.Core.BL
{
    public class ComicBL: BaseBL<Comic>
    {
        #region Constructor
        public ComicBL()
            :base("Comics")
        {

        }
        #endregion

        #region Override
        public override IQueryable<Comic> IncludeByDefault(IQueryable<Comic> Value)
        {
            return Value.Include(a=> a.SpinGeolocation).ThenInclude(a => a.Place );
        }
        #endregion
    }
}
