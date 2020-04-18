using System;
using Spin.Connection.Entity;
using Spin.Connection.Entity.Attribute;
using Spin.Modules.Entity.Geolocation;
using Spin.WebSite.Spin.Module.Comics.Core.Entity.Geolocation;

namespace Spin.WebSite.Spin.Module.Comics.Core.Entity
{
    public class Comic: BaseEntity, IBaseEntityGeolocation<ComicGeolocation>
    {
        #region Constructor
        public Comic()
            : base("IdComic")
        {

        }

        public Comic(string KeyPropertyName)
           : base(KeyPropertyName)
        {

        }

        public Comic(string KeyPropertyName, string Module)
          : base(KeyPropertyName, Module)
        {

        }
        #endregion

        #region Property
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int Number { get; set; }
        public bool Enabled { get; set; }

        [ForeignKeySpin("IdRelation")]
        public SpinGeolocation<ComicGeolocation> SpinGeolocation { get; set; }

        #endregion

       

    }
}
