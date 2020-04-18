using System;
using Spin.Base.Geolocation.Entity;

namespace Spin.WebSite.Spin.Module.Comics.Core.Entity.Geolocation
{
    public class ComicGeolocation: GeolocationTranslate
    {
        #region Constructor
        public ComicGeolocation()
            : base("IdComicGeolocation", "Comics")
        {

        }


        #endregion


        #region Property
        public string Name { get; set; }
        #endregion

       

        
    }
}
