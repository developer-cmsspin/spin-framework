using System;
using Spin.Connection.Entity.Attribute;
using Spin.Modules.Entity.Backend.Generator.Detail;
using Spin.Modules.Entity.History;
using Spin.Security.Entity;

namespace Spin.WebSite.Spin.Module.Comics.Core.Entity
{
    [TableNameSpin("User")]
    public class UseCustom: UserBase
    {
        [SpinFieldDetail(Show = false)]
        [IgnoreHistory]
        public string DeviceToken { get; set; }

        [NotMappedSpin]
        [SpinFieldDetail(Show = false)]
        public string Version { get; set; }

        [SpinFieldDetail(Show = false)]
        public string DeviceType { get; set; }

        [ImageSpinField(true, Order = 2, Style = "end-row-field")]
        public string Signature { get; set; }

        [SpinFieldDetail(Group = "Email")]
        public string EmailPassword { get; set; }

        [SpinFieldDetail(Group = "Email")]
        public string PixelAnalytics { get; set; }
    }
}
