using System;
using Spin.Connection.Entity;
using Spin.Helper.Session;
using Spin.Modules.Entity.Backend.Generator.Detail;
using Spin.Modules.Entity.Backend.Generator.Select;

namespace Spin.WebSite.Spin.Module.Management.Core.Entity
{
    public class SessionInterface //: BaseEntity
    {
        #region Constructor
        public SessionInterface()
           //: base("Util")
        {

        }

        #endregion

        #region Property
        public string Name
        {
            get { return Data.ToString(); }
        }

        //[TemplateSpinFieldSelect("LeadAssignSelect", Title = " ", Order = 1, SizeColumn = 1)]
        [SpinFieldDetail(Show =false)]

        public object Data
        {
            get;
            set;
        }
        #endregion



        #region GetName
        public  string GetName()
        {
            return "";
        }
        #endregion
    }
}
