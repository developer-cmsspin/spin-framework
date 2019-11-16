using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Spin.WebSite.Spin.Module.Security.Core.Entity
{
    public class LoginRequest
    {
        #region Property
        public string Email { get; set; }
        public string Password { get; set; }
        public string DeviceToken { get; set; }
        public string DeviceType { get; set; } = "IOS";
        #endregion
    }
}
