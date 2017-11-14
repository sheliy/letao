$(function(){
    $.ajax({
        type: "get",
        url: '/category/queryTopCategory',
        success: function(data){
            // console.log(data);
            $(".lt_left .mui-scroll").html(template("tmpl",data));

            var id = $('.lt_left li.now').data("id");
            // console.log(id);
            renderSecond(data.rows[0].id);
        }
    });

    function renderSecond(id){
        $.ajax({
            type:"get",
            url: "/category/querySecondCategory",
            data: {
                id:id
            },
            success: function(data){
                // console.log(data);
                $(".lt_right .mui-scroll").html(template("tmpr",data));
            }
        });
    }

    $('.lt_left').on("click", "li", function(){
        // console.log("g");
        $(this).addClass("now").siblings().removeClass("now");
        var id = $('.lt_left li.now').data("id");
        // console.log(id);
        renderSecond(id);
    });
});