using Spin.Connection.DAL.Storage;
using Spin.Helper.ImageTool;
using Spin.Helper.IO.Entity;
using Spin.Security.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Spin.WebSite.Spin.Module.Security.Core.BL
{
    public class APIUser
    {
        public static string CreateAvatar(User Value)
        {
            //Information 
            var FileInfo = new SpinFile(Value.Image);

            AzureBlobBase FileData = new AzureBlobBase();
            FileData.Container = "spinfile";
            var DataItem = FileData.GetFileByPath(FileInfo.FullFileName);
            DataItem.Wait();
            Stream StrReader = DataItem.Result;

            //Availability
            StrReader.Position = 0;
            string PathSaveAvailability = $"{FileInfo.PathName}/avatar/{FileInfo.FileNameWithOutExtension}/{FileInfo.FileNameWithOutExtension}_avatar{FileInfo.ExtensionName}";
            var ResultAvailability = ImageSpin.CreateAvatar(StrReader, 300, 300, FileInfo.ExtensionName.Replace(".", ""));
            FileData.SaveFile(PathSaveAvailability, ResultAvailability).Wait();

            return PathSaveAvailability;
        }

        public static List<string> CreateAvatarStatus(User Value)
        {
            List<string> Result = new List<string>();

            //Information 
            var FileInfo = new SpinFile(Value.Image);

            AzureBlobBase FileData = new AzureBlobBase();
            FileData.Container = "spinfile";
            var DataItem = FileData.GetFileByPath(FileInfo.FullFileName);
            DataItem.Wait();
            Stream StrReader = DataItem.Result;

            //Availability
            StrReader.Position = 0;
            string PathSaveAvailability = $"{FileInfo.PathName}/avatar/{FileInfo.FileNameWithOutExtension}/{FileInfo.FileNameWithOutExtension}_available{FileInfo.ExtensionName}";
            var ResultAvailability = ImageSpin.CreateAvatarWithStatus(StrReader, 300, 300, FileInfo.ExtensionName.Replace(".", ""), "00FF00");
            FileData.SaveFile(PathSaveAvailability, ResultAvailability).Wait();

            //Unavailable
            StrReader.Position = 0;
            string PathSaveUnavailable = $"{FileInfo.PathName}/avatar/{FileInfo.FileNameWithOutExtension}/{FileInfo.FileNameWithOutExtension}_unavailable{FileInfo.ExtensionName}";
            var ResultUnavailable = ImageSpin.CreateAvatarWithStatus(StrReader, 300, 300, FileInfo.ExtensionName.Replace(".", ""), "FF0000");
            FileData.SaveFile(PathSaveUnavailable, ResultUnavailable).Wait();

            //Add Path
            Result.Add(PathSaveAvailability);
            Result.Add(PathSaveUnavailable);

            return Result;
        }
    }
}
