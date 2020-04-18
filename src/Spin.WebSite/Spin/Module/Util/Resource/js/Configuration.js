$("#btnSaveConfiguration").click(function () {

    $("#loadingConfiguration").show();
    
    var ArrayItem = [];

    $.each($("#frmConfiguration input"), function (key, value) {
        var id = $(this).attr("configuration-id");
        var value = $(this).val();
        ArrayItem.push(createConfiguration(id,value));
    });

    $.ajax({
        method: "POST",
        url: "/Api/Util/ConfigurationApi/Save",
        data: JSON.stringify(ArrayItem),
        contentType: "application/json",
        dataType: "json",
    }).done(function (msg) {
        $.each(msg, function (key, value) {
            $("#id" + value.name).attr("configuration-id", value.id);

        });

        $("#loadingConfiguration").hide();

        }).fail(function() {
            $("#loadingConfiguration").hide();
        });
});


function createConfiguration(id,value) {
    return {
        $type: "Spin.Modules.Entity.ModuleConfiguration, Spin.Modules",
        Id: id,
        Value: value
    };
}