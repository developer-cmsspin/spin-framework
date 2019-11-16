if (!$("#contentMenu").is(":visible")) {

    $("#menuMobile").click(function () {

        if ($(".menu-mobile").hasClass("rotate-logo-mobile"))
            $(".menu-mobile").removeClass("rotate-logo-mobile");
        else
            $(".menu-mobile").addClass("rotate-logo-mobile");

        $("#contentMenu").slideToggle("slow");
    });

}

function searchFilter() {
    var test = spinAppModule;
    var search = $("#slFilterValue").val();
        var jsonData = JSON.stringify({ page: 1, id: search, itemsPerPage: 50 });
        $.post("/Admin/Lead/Home/Search", jsonData).then(
            function (response) {
                var response = response.data.result;
                var totalCount = response.data.totalItems;

                console.log(response);
            },
            function (response) {


                alert('error');


            });
}