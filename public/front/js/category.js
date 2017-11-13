$(function(){
    $.ajax({
        type: "get",
        url: '/category/queryTopCategory',
        success: function(data){
            console.log(data);
            $(".lt_left .mui-scroll").html(template("tmpl",data));
        }
    });
});