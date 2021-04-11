using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Spin.WebSite.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Base_MemberTranslate",
                columns: table => new
                {
                    IdMemberTranslate = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdRelation = table.Column<int>(type: "int", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Base_MemberTranslate", x => x.IdMemberTranslate);
                });

            migrationBuilder.CreateTable(
                name: "Comics_Comic",
                columns: table => new
                {
                    IdComic = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Number = table.Column<int>(type: "int", nullable: false),
                    Enabled = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comics_Comic", x => x.IdComic);
                });

            migrationBuilder.CreateTable(
                name: "MyModule_Data",
                columns: table => new
                {
                    IdData = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MyModule_Data", x => x.IdData);
                });

            migrationBuilder.CreateTable(
                name: "Place_Place",
                columns: table => new
                {
                    IdPlace = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdParent = table.Column<int>(type: "int", nullable: true),
                    TypePlace = table.Column<int>(type: "int", nullable: false),
                    Latitude = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Longitude = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    polygon = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LevelTree = table.Column<int>(type: "int", nullable: false),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Enabled = table.Column<bool>(type: "bit", nullable: false),
                    TimeZone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Viewport = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Place_Place", x => x.IdPlace);
                    table.ForeignKey(
                        name: "FK_Place_Place_Place_Place_IdParent",
                        column: x => x.IdParent,
                        principalTable: "Place_Place",
                        principalColumn: "IdPlace",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Spin_Error",
                columns: table => new
                {
                    IdError = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCustomer = table.Column<int>(type: "int", nullable: false),
                    Module = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Detail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spin_Error", x => x.IdError);
                });

            migrationBuilder.CreateTable(
                name: "Spin_Language",
                columns: table => new
                {
                    IdLanguage = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCustomer = table.Column<int>(type: "int", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spin_Language", x => x.IdLanguage);
                });

            migrationBuilder.CreateTable(
                name: "Spin_Module",
                columns: table => new
                {
                    IdModule = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Enabled = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spin_Module", x => x.IdModule);
                });

            migrationBuilder.CreateTable(
                name: "Spin_Redirect",
                columns: table => new
                {
                    IdRedirect = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UrlBase = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UrlRedirect = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Enabled = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spin_Redirect", x => x.IdRedirect);
                });

            migrationBuilder.CreateTable(
                name: "Spin_ScheduleTask",
                columns: table => new
                {
                    IdScheduleTask = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Module = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimeSpanToExecuteTask = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimeToExecuteTask = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastDateExecute = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsExecuted = table.Column<bool>(type: "bit", nullable: false),
                    Enabled = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spin_ScheduleTask", x => x.IdScheduleTask);
                });

            migrationBuilder.CreateTable(
                name: "Spin_Theme",
                columns: table => new
                {
                    IdTheme = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPublic = table.Column<bool>(type: "bit", nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    Enabled = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spin_Theme", x => x.IdTheme);
                });

            migrationBuilder.CreateTable(
                name: "MyModule_AdditionalData",
                columns: table => new
                {
                    IdAdditionalData = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdData = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MyModule_AdditionalData", x => x.IdAdditionalData);
                    table.ForeignKey(
                        name: "FK_MyModule_AdditionalData_MyModule_Data_IdData",
                        column: x => x.IdData,
                        principalTable: "MyModule_Data",
                        principalColumn: "IdData",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MyModule_CommentsData",
                columns: table => new
                {
                    IdCommentsData = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdData = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MyModule_CommentsData", x => x.IdCommentsData);
                    table.ForeignKey(
                        name: "FK_MyModule_CommentsData_MyModule_Data_IdData",
                        column: x => x.IdData,
                        principalTable: "MyModule_Data",
                        principalColumn: "IdData",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Comics_ComicGeolocation",
                columns: table => new
                {
                    IdComicGeolocation = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdRelation = table.Column<int>(type: "int", nullable: false),
                    IdPlace = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comics_ComicGeolocation", x => x.IdComicGeolocation);
                    table.ForeignKey(
                        name: "FK_Comics_ComicGeolocation_Comics_Comic_IdRelation",
                        column: x => x.IdRelation,
                        principalTable: "Comics_Comic",
                        principalColumn: "IdComic",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comics_ComicGeolocation_Place_Place_IdPlace",
                        column: x => x.IdPlace,
                        principalTable: "Place_Place",
                        principalColumn: "IdPlace",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Place_PlaceTranslate",
                columns: table => new
                {
                    IdPlaceTranslate = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdRelation = table.Column<int>(type: "int", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Place_PlaceTranslate", x => x.IdPlaceTranslate);
                    table.ForeignKey(
                        name: "FK_Place_PlaceTranslate_Place_Place_IdRelation",
                        column: x => x.IdRelation,
                        principalTable: "Place_Place",
                        principalColumn: "IdPlace",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Spin_ModuleConfiguration",
                columns: table => new
                {
                    IdModuleConfiguration = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdCustomer = table.Column<int>(type: "int", nullable: true),
                    GroupConfiguration = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdModule = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spin_ModuleConfiguration", x => x.IdModuleConfiguration);
                    table.ForeignKey(
                        name: "FK_Spin_ModuleConfiguration_Spin_Module_IdModule",
                        column: x => x.IdModule,
                        principalTable: "Spin_Module",
                        principalColumn: "IdModule",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Security_Customer",
                columns: table => new
                {
                    IdCustomer = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdTheme = table.Column<int>(type: "int", nullable: true),
                    Domain = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InternalSite = table.Column<bool>(type: "bit", nullable: false),
                    RedirectHTTPS = table.Column<bool>(type: "bit", nullable: false),
                    RedirectWWW = table.Column<bool>(type: "bit", nullable: false),
                    Enabled = table.Column<bool>(type: "bit", nullable: false),
                    IdCustomerParent = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Security_Customer", x => x.IdCustomer);
                    table.ForeignKey(
                        name: "FK_Security_Customer_Spin_Theme_IdTheme",
                        column: x => x.IdTheme,
                        principalTable: "Spin_Theme",
                        principalColumn: "IdTheme",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MyModule_ImagesCommentsData",
                columns: table => new
                {
                    IdImagesCommentsData = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCommentsData = table.Column<int>(type: "int", nullable: false),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MyModule_ImagesCommentsData", x => x.IdImagesCommentsData);
                    table.ForeignKey(
                        name: "FK_MyModule_ImagesCommentsData_MyModule_CommentsData_IdCommentsData",
                        column: x => x.IdCommentsData,
                        principalTable: "MyModule_CommentsData",
                        principalColumn: "IdCommentsData",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Security_CustomerModule",
                columns: table => new
                {
                    IdCustomerModule = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdModule = table.Column<int>(type: "int", nullable: false),
                    IdCustomer = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Security_CustomerModule", x => x.IdCustomerModule);
                    table.ForeignKey(
                        name: "FK_Security_CustomerModule_Security_Customer_IdCustomer",
                        column: x => x.IdCustomer,
                        principalTable: "Security_Customer",
                        principalColumn: "IdCustomer",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Security_CustomerModule_Spin_Module_IdModule",
                        column: x => x.IdModule,
                        principalTable: "Spin_Module",
                        principalColumn: "IdModule",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Security_Group",
                columns: table => new
                {
                    IdGroup = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdGroupParent = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShowConfigurationDashboard = table.Column<bool>(type: "bit", nullable: false),
                    IdCustomer = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Security_Group", x => x.IdGroup);
                    table.ForeignKey(
                        name: "FK_Security_Group_Security_Customer_IdCustomer",
                        column: x => x.IdCustomer,
                        principalTable: "Security_Customer",
                        principalColumn: "IdCustomer",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Spin_Alias",
                columns: table => new
                {
                    IdAlias = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Module = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Controller = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Action = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Parameter = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdCustomer = table.Column<int>(type: "int", nullable: true),
                    Enabled = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spin_Alias", x => x.IdAlias);
                    table.ForeignKey(
                        name: "FK_Spin_Alias_Security_Customer_IdCustomer",
                        column: x => x.IdCustomer,
                        principalTable: "Security_Customer",
                        principalColumn: "IdCustomer",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Security_GroupPermission",
                columns: table => new
                {
                    IdGroupPermission = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdGroup = table.Column<int>(type: "int", nullable: false),
                    Module = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Segment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Controller = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Show = table.Column<bool>(type: "bit", nullable: false),
                    ShowConfiguration = table.Column<bool>(type: "bit", nullable: false),
                    ShowHistory = table.Column<bool>(type: "bit", nullable: true),
                    Edit = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Security_GroupPermission", x => x.IdGroupPermission);
                    table.ForeignKey(
                        name: "FK_Security_GroupPermission_Security_Group_IdGroup",
                        column: x => x.IdGroup,
                        principalTable: "Security_Group",
                        principalColumn: "IdGroup",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Security_User",
                columns: table => new
                {
                    IdUser = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChangePassword = table.Column<bool>(type: "bit", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailAlternative = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Occupation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdCustomer = table.Column<int>(type: "int", nullable: false),
                    IdGroup = table.Column<int>(type: "int", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsConnect = table.Column<bool>(type: "bit", nullable: false),
                    LastConnect = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Token = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsAdministrator = table.Column<bool>(type: "bit", nullable: false),
                    Enabled = table.Column<bool>(type: "bit", nullable: false),
                    PathStructure = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdOwner = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Security_User", x => x.IdUser);
                    table.ForeignKey(
                        name: "FK_Security_User_Security_Customer_IdCustomer",
                        column: x => x.IdCustomer,
                        principalTable: "Security_Customer",
                        principalColumn: "IdCustomer",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Security_User_Security_Group_IdGroup",
                        column: x => x.IdGroup,
                        principalTable: "Security_Group",
                        principalColumn: "IdGroup",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Security_Session",
                columns: table => new
                {
                    IdSession = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Token = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IdUser = table.Column<int>(type: "int", nullable: false),
                    DeviceToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastConnect = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeviceType = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Security_Session", x => x.IdSession);
                    table.ForeignKey(
                        name: "FK_Security_Session_Security_User_IdUser",
                        column: x => x.IdUser,
                        principalTable: "Security_User",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Security_UserHistory",
                columns: table => new
                {
                    IdUserHistory = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdRelation = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OldData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CodeUpdate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeHistory = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TableName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    User = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Security_UserHistory", x => x.IdUserHistory);
                    table.ForeignKey(
                        name: "FK_Security_UserHistory_Security_User_IdRelation",
                        column: x => x.IdRelation,
                        principalTable: "Security_User",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comics_ComicGeolocation_IdPlace",
                table: "Comics_ComicGeolocation",
                column: "IdPlace");

            migrationBuilder.CreateIndex(
                name: "IX_Comics_ComicGeolocation_IdRelation",
                table: "Comics_ComicGeolocation",
                column: "IdRelation");

            migrationBuilder.CreateIndex(
                name: "IX_MyModule_AdditionalData_IdData",
                table: "MyModule_AdditionalData",
                column: "IdData");

            migrationBuilder.CreateIndex(
                name: "IX_MyModule_CommentsData_IdData",
                table: "MyModule_CommentsData",
                column: "IdData");

            migrationBuilder.CreateIndex(
                name: "IX_MyModule_ImagesCommentsData_IdCommentsData",
                table: "MyModule_ImagesCommentsData",
                column: "IdCommentsData");

            migrationBuilder.CreateIndex(
                name: "IX_Place_Place_IdParent",
                table: "Place_Place",
                column: "IdParent");

            migrationBuilder.CreateIndex(
                name: "IX_Place_PlaceTranslate_IdRelation",
                table: "Place_PlaceTranslate",
                column: "IdRelation");

            migrationBuilder.CreateIndex(
                name: "IX_Security_Customer_IdTheme",
                table: "Security_Customer",
                column: "IdTheme");

            migrationBuilder.CreateIndex(
                name: "IX_Security_CustomerModule_IdCustomer",
                table: "Security_CustomerModule",
                column: "IdCustomer");

            migrationBuilder.CreateIndex(
                name: "IX_Security_CustomerModule_IdModule",
                table: "Security_CustomerModule",
                column: "IdModule");

            migrationBuilder.CreateIndex(
                name: "IX_Security_Group_IdCustomer",
                table: "Security_Group",
                column: "IdCustomer");

            migrationBuilder.CreateIndex(
                name: "IX_Security_GroupPermission_IdGroup",
                table: "Security_GroupPermission",
                column: "IdGroup");

            migrationBuilder.CreateIndex(
                name: "IX_Security_Session_IdUser",
                table: "Security_Session",
                column: "IdUser");

            migrationBuilder.CreateIndex(
                name: "IX_Security_User_IdCustomer",
                table: "Security_User",
                column: "IdCustomer");

            migrationBuilder.CreateIndex(
                name: "IX_Security_User_IdGroup",
                table: "Security_User",
                column: "IdGroup");

            migrationBuilder.CreateIndex(
                name: "IX_Security_UserHistory_IdRelation",
                table: "Security_UserHistory",
                column: "IdRelation");

            migrationBuilder.CreateIndex(
                name: "IX_Spin_Alias_IdCustomer",
                table: "Spin_Alias",
                column: "IdCustomer");

            migrationBuilder.CreateIndex(
                name: "IX_Spin_ModuleConfiguration_IdModule",
                table: "Spin_ModuleConfiguration",
                column: "IdModule");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Base_MemberTranslate");

            migrationBuilder.DropTable(
                name: "Comics_ComicGeolocation");

            migrationBuilder.DropTable(
                name: "MyModule_AdditionalData");

            migrationBuilder.DropTable(
                name: "MyModule_ImagesCommentsData");

            migrationBuilder.DropTable(
                name: "Place_PlaceTranslate");

            migrationBuilder.DropTable(
                name: "Security_CustomerModule");

            migrationBuilder.DropTable(
                name: "Security_GroupPermission");

            migrationBuilder.DropTable(
                name: "Security_Session");

            migrationBuilder.DropTable(
                name: "Security_UserHistory");

            migrationBuilder.DropTable(
                name: "Spin_Alias");

            migrationBuilder.DropTable(
                name: "Spin_Error");

            migrationBuilder.DropTable(
                name: "Spin_Language");

            migrationBuilder.DropTable(
                name: "Spin_ModuleConfiguration");

            migrationBuilder.DropTable(
                name: "Spin_Redirect");

            migrationBuilder.DropTable(
                name: "Spin_ScheduleTask");

            migrationBuilder.DropTable(
                name: "Comics_Comic");

            migrationBuilder.DropTable(
                name: "MyModule_CommentsData");

            migrationBuilder.DropTable(
                name: "Place_Place");

            migrationBuilder.DropTable(
                name: "Security_User");

            migrationBuilder.DropTable(
                name: "Spin_Module");

            migrationBuilder.DropTable(
                name: "MyModule_Data");

            migrationBuilder.DropTable(
                name: "Security_Group");

            migrationBuilder.DropTable(
                name: "Security_Customer");

            migrationBuilder.DropTable(
                name: "Spin_Theme");
        }
    }
}
