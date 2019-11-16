![alt text](http://dev.cmsspin.com/Spin/Themes/SpinWeb/Resource/img/logo-spin-color.png)
# CMS SPIN V 0.1.24 (Release Candidate)
### *Date: 30 JuL 2019 9:00*
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)  [![NuGet package](https://img.shields.io/badge/Nuget-0.1.24rc-blue.svg)](https://www.nuget.org/packages/Spin/0.1.24-rc)

CMS BUILD TO .NET CORE. BY WEB DEVELOP.

## New Features

  - History for changes register
  ```csharp
  public class TestHistory : BaseHistory
  {
        #region Constructor
        public TestHistory()
            :base("IdTestHistory")
        {
            this.TableName = "Test";
        }
        #endregion

        #region GetName
        public override string GetName()
        {
            return "";
        }
        #endregion

  }
  ```

  ```csharp
  public class TestItem : BaseEntity, IBaseEntityHistory<TestHistory>
  {
    public void AddHistory(IEntityHistory OldValue, string IdSession)
    {
      SecurityManager UserData = new SecurityManager(IdSession);
      this.AddHistoryChanges(OldValue as LeadItem,UserData.User.UserNameUserData.User.FirstName +  " " + UserData.User.LastName);
    }
  }
  ```
  - Add Migration
  ```bash
  dotnet ef migrations add InitialCreate
  ```
  ```bash
  dotnet ef migrations add [Name] -c SpinGlobalContext
  ```
- Diagnostic Log
```csharp
    public class Startup: SpinStartup
    {
        #region Startup
        public Startup(IConfiguration configuration)
            :base(configuration, new MillionAndUpInformation())
        {
            this.AddProviderDiagnosticLog(new MongoProviderDiagnostics());
            this.AddProviderDiagnosticLog(new RaygunProviderDiagnostics());//
        }
        #endregion
    }
```

- Custom Command for start Spin
```csharp
    public class Program: SpinProgram<Startup>
    {
        public static void Main(string[] args)
        {
            AddCommandCalls(new StartCall("Test","t","Test By data",
                (command)=>{
                    Console.WriteLine("Hello World");
                }));

            CallMain(args);
        }

    }
```

```bash
dotnet Spin.Website.dll --test
```
OR
```bash
dotnet Spin.Website.dll --t
```


- Active log robots
```csharp
    public class Startup: SpinStartup
    {
        public Startup(IConfiguration configuration)
            :base(configuration)
        {
            ScheduleTaskFactory.EnabledLogs = true;

        }
    }
```

- 4 Phones on leads

## Issuses Fixed


  

## Deploy

- Please execute this script for update fields 4phones Feature
```sql

BEGIN TRANSACTION
    ALTER TABLE [Lead_Lead]
        ADD [Phone1] varchar(200) NULL,
            [Phone2] varchar(200) NULL,
            [Phone3] varchar(200) NULL;

    ALTER TABLE [Lead_Message]
        ADD [Number] NVARCHAR(100) NULL;

    ALTER TABLE [Lead_Whatsapp]
        ADD [Number] NVARCHAR(100) NULL;

COMMIT;

```

> *Important:* <br>
> Run script for production.




### *Development by CMS SPIN Delevoper Team*