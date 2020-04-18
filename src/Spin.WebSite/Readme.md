![alt text](https://dev.cmsspin.com/Spin/Themes/SpinWeb/Resource/img/logo-spin-color.png)

# CMS SPIN V 0.1.26-beta6 (Beta)

### *Date: 14 Febrary 2020 9:00*

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)  [![NuGet package](https://img.shields.io/badge/Nuget-0.1.26(beta4)-blue.svg)](https://www.nuget.org/packages/Spin/0.1.26-beta6)

CMS BUILD TO . NET CORE. BY WEB DEVELOP.

## New Features

  + change User 

``` csharp
  public override void ConfigureServiceSpin(SpinServiceCollection Service)
  {
    SpinWebSiteCollection.SpinService.AddSingleton<ISpinSecutiry, UserBLExtend>();
  }
  ```

  + Add CDN server for Image, Javascript And Styles
  + Implment Complex SelectAllPerPageComplex
  + Documentation Online

## Issuses Fixed

 + Filter Expresion Complex Objects
  

## Deploy

* Change Structure User

``` sql
  ALTER TABLE [Security_User]
  DROP COLUMN IdGroupManager;

GO

  ALTER TABLE [Security_User]
  ADD PathStructure VARCHAR(200) NULL

GO

  ALTER TABLE [Security_User]
  ADD  IdOwner int NULL

```

> *Important:* <br>
> Run script for production.

### *Development by CMS SPIN Delevoper Team*

