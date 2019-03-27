

$(document).ready(function() {
    $("#logout").hover(function(){
        $(this).css("border-bottom","1px solid #00F");
        $(this).css("color","blue");
    },function(){
        $(this).css("border-bottom","0px solid #00F");
        $(this).css("color","blue");
    });
});
