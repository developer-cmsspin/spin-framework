using System;
using System.Collections.Generic;
using System.Web;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Spin.Modules.API.Base;
using Spin.Modules.Helper;
using Spin.Security.API.Base;
using Spin.Security.Entity;



namespace Spin.WebSite.Spin.Module.Security.Core.BL
{
public class SecurityBL : BaseCustomerBL<User>
    {
        #region Constructor
        public SecurityBL(String IdSession)
            : base("Security", IdSession, new Connection.Entity.ConfigurationSpinDataContext()
            {
                OnModelAdditional = (modelBuilder) =>
                {
                    
                },
                OnConfigurationAdditional = (optionsBuilder) =>
                {
                    //optionsBuilder.EnableDetailedErrors();
                }
            })
        {

        }

        public SecurityBL()
            : base("Security")
        {

        }

        #endregion

        #region ChangeState
        public User ChangeState(User Value, HttpContext ContextInfo)
        {

            if (Value.IdCustomer == 0)
                Value.IdCustomer = IdCustomer;

            base.InsertOrUpdate(Value);

            //Add Message Bird
            /*
            LeadConfiguration Conf = new LeadConfiguration(this.IdSession);
            try
            {
                foreach (var strPhone in Conf.MessageBirdPhones)
                {
                    //SMS
                    var TaskDataMSM = ModuleHelper.SpinRenderAsync(ContextInfo, "ChangeStateSMS", "Home", "Security", "Email", Value, false);
                    TaskDataMSM.Wait();
                    IHtmlContent ResultControllerSMS = TaskDataMSM.Result;


                    MessageBirdAPI api = new MessageBirdAPI(Conf.MessageBirdToken);
                    MillionAndUp.MessageBird.Entity.Message MessageBirdData = new MillionAndUp.MessageBird.Entity.Message();
                    MessageBirdData.Body = HttpUtility.HtmlDecode(ResultControllerSMS.ToString());
                    MessageBirdData.Originator = $"MAU";
                    MessageBirdData.Recipients = strPhone;
                    api.SendMessage(MessageBirdData);
                }
            }
            catch (Exception ex)
            {
                Console.Write("Error sending User Change state SMS " + ex);
            }
             */

            return Value;

        }
        #endregion
    }
}
