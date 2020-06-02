$("#LoginData").validate();

function valueEqualText() {
    var valueNewPass = $("#newPassword").val();
    var valueRepNewPass = $("#newPasswordRepeat").val();
    var confirmShow = $(".error-same-value").hasClass('show');

    if (valueNewPass != valueRepNewPass && !confirmShow) {
        $("#newPasswordRepeat").after('<label class="error-same-value show" style="color:red;">Values do not match.</label>');
        $("#newPasswordRepeat").addClass('error');
    }
    else if (valueNewPass == valueRepNewPass && confirmShow) {
        $(".error-same-value").remove();
        $("#newPasswordRepeat").removeClass('error');
    }

}

$("#newPasswordRepeat, #newPassword").keyup(function () {
    valueEqualText();
});