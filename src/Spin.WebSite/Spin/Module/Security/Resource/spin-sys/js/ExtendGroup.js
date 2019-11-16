//Edgar Test RT 78
///Admin/Lead/Home/IndexGenerate#!/detail/60480

var directivesExtend = [];

var ExtendAdminSelect = function ($scope, $http, $filter, $location) {
   
};

var ExtendAdminDetail = function ($scope, $http, $filter, $location) {
   
    /*LOAD INFORMATION GROUP*/
    $scope.loadDetailAfter = function (scope, response) {
        if(response.data.groupPermissions != undefined){
            $.each(response.data.groupPermissions, function(keyPermission, valuePermission){
                var Control = $("#" + valuePermission.module + "Admin" + valuePermission.controller);
                Control.find(".id").val(valuePermission.id);
                Control.find(".show-check").prop( "checked", valuePermission.show );
                Control.find(".edit-check").prop( "checked", valuePermission.edit );
                Control.find(".configuration-check").prop( "checked", valuePermission.showConfiguration );
                Control.find(".history-check").prop( "checked", valuePermission.showHistory );
            });
        }
    };

    /*SAVE INFORMATION GROUP*/
    $scope.saveBefore = function(scope){
        scope.entity.groupPermissions = [];

        $.each($('.content-title-page'), function(key, value){
            var valuePermission = {};
            var itemGroup = $(value);

            valuePermission.controller = itemGroup.find(".controller").val();
            valuePermission.module = itemGroup.find(".module").val();
            valuePermission.segment = itemGroup.find(".segment").val();
            valuePermission.id = itemGroup.find(".id").val();
            valuePermission.show = itemGroup.find(".show-check").is(':checked');
            valuePermission.edit = itemGroup.find(".edit-check").is(':checked');
            valuePermission.showConfiguration = itemGroup.find(".configuration-check").is(':checked');
            valuePermission.showHistory = itemGroup.find(".history-check").is(':checked');

            if(valuePermission.show || valuePermission.showConfiguration || valuePermission.edit || valuePermission.id != 0 ){
                scope.entity.groupPermissions.push(valuePermission);
            }
        });
    };

    /*CHECKED SHOW WHEN CLICK EDIT*/
    $scope.validateShow = function(namecontent)
    {
        var Control = $("#" + namecontent);
        if(Control.find(".edit-check").is(':checked')){
            Control.find(".show-check").prop( "checked", true );
        }
    }

    $scope.validateConfiguration = function(namecontent)
    {
        var Control = $("#" + namecontent);
        if(Control.find(".configuration-check").is(':checked')){
            Control.find(".configuration-check").prop( "checked", true );
        }
    }

    $scope.validateHistory = function(namecontent)
    {
        var Control = $("#" + namecontent);
        if(Control.find(".configuration-check").is(':checked')){
            Control.find(".configuration-check").prop( "checked", true );
        }
    }

    $scope.validateEdit= function(namecontent)
    {
        var Control = $("#" + namecontent);
        if(!Control.find(".show-check").is(':checked')){
            Control.find(".edit-check").prop( "checked", false );
        }
    }

    /*SELECT ALL PERMISSION*/
    $scope.selectAllPermission =  function()
    {
        $.each($("#contentPermission").find(".show-check, .edit-check"), function(key,value){
            $(value).prop( "checked", true );
        });
    }

};