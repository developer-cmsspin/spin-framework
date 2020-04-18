using System;
using Spin.Security.API;
using Spin.Security.API.Base;
using Spin.Security.Entity.Base;
using Spin.WebSite.Spin.Module.Security.Core.Entity;

namespace Spin.WebSite.Spin.Module.Security.Core.BL
{
    public class UserBLExtend<T>: UserBaseBL<T>
        where T: UserExtend, new()
    {
        
    }
}
