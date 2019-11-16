var messagesSpin = {
    timeDelayMessage: 5000,
    showMessage: function (message, typeMessage, useTimer = true) {
        var iconMessage = "";
        var classStyle = "";
        //create menu
        switch (typeMessage) {

            case "error":
                iconMessage = "fa-times";
                classStyle = "alert-danger";
                break;

            case "success":
                iconMessage = "fa-check";
                classStyle = "alert-success";
                break;

            case "warning":
                iconMessage = "fa-exclamation";
                classStyle = "alert-warning";
                break;

            default:
            case "info":
                iconMessage = "fa-refresh";
                classStyle = "alert-info";
                useTimer = false;
                break;
        }

        //Remove all
        //Remove Icon
        $("#iconMessage").removeClass("fa-times");
        $("#iconMessage").removeClass("fa-check");
        $("#iconMessage").removeClass("fa-exclamation");
        $("#iconMessage").removeClass("fa-refresh");
        //Remove Class
        $("#MessageSpin").removeClass("alert-danger");
        $("#MessageSpin").removeClass("alert-success");
        $("#MessageSpin").removeClass("alert-warning");
        $("#MessageSpin").removeClass("alert-info");

        //Add Item
        $("#iconMessage").addClass(iconMessage);
        $("#MessageSpin").addClass(classStyle);
        $("#contentMessage").html(message);

        $("#MessageSpin").fadeIn();


        setInterval(function () {
            if (useTimer && $("#contentMessage").html() == message) {
                messagesSpin.hideMessage();
            }
        }, messagesSpin.timeDelayMessage);

    },
    hideMessage: function () {
        $("#MessageSpin").fadeOut();
    },
    //MessageConfirm
    showMessageConfirm: function (message, functionYes, functionNo) {
        $("#contentMessageConfirm").html(message);
        $("#MessageconfirmSpin").fadeIn();

        $("#btnYes").unbind("click");
        $("#btnNo").unbind("click");


        $("#btnYes").click(function () {
            if (functionYes != null)
                functionYes();

            messagesSpin.hideMessageConfirm();
        });


        $("#btnNo").click(function () {
            if (functionNo != null)
                functionNo();

            messagesSpin.hideMessageConfirm();
        });

    },

    hideMessageConfirm: function () {
        $("#MessageconfirmSpin").fadeOut();
    },

    //Warning
    AddWarning: function (text = "", key = "") {
        if (!$("#" + key + "Warning").length) {
            var divWarning = $("<div>").attr("id", key + "Warning").addClass("item-warning");
            divWarning.append($("<i class='fas fa-exclamation-circle'>")).append(text);

            $("#contentWarning").append(divWarning);
            $("#contentWarning").show();
        }
    },

    RemoveWarning: function (key) {
        $("#" + key + "Warning").remove();

        if ($(".item-warning").length == 0)
            $("#contentWarning").hide();
    },
};