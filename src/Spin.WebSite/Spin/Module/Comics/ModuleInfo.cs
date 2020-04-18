using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Spin.Modules.Entity;

namespace Spin.Modules.Comics
{
    [Serializable]
    public class Home : SpinModuleBase
    {
        public Home()
            : base("Comics")
        {
            
        }
    }
}