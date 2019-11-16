/*Control selected*/
$(".spin-item-form input").focus(function(){
    $(this).parent().parent().addClass("select-input");
});

$(".spin-item-form input").blur(function(){
    $(this).parent().parent().removeClass("select-input");
});


/*select group information*/
/*load only pass scroll */
function isScrolledIntoView(elem, container = $(window)){
    var $elem = $(elem);
    var $window = container;

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

//Var to check if is setting scroll
var isSetScroll = false;

$(".content-main").scroll(function(){
  $('.spin-title-group-detail').each(function(key, value){
        if(isScrolledIntoView($(value))){
            //console.log( "move to " +  value.id);
            if(!$("#menuGroup" + value.id).hasClass("item-group-detail-select")){
                $(".item-group-detail").removeClass("item-group-detail-select");
                $("#menuGroup" + value.id).addClass("item-group-detail-select");

                var currentScroll = $("#group-container").scrollLeft();
                var itemScroll = $('#menuGroup' + value.id).offset().left;
                if(!isScrolledIntoView($('#menuGroup' + value.id),$('#groups')) && !isSetScroll)
                {
                    isSetScroll = true;
                    $('#group-container').scrollTo($('#menuGroup' + value.id), {duration:500, complete:function(){
                            isSetScroll = false;
                            }
                        });
                        //console.log('no se ve ' + '#menuGroup' + value.id);
                }
            }
        }
  });
});




