$(function(){
    $.ajax({
        type: "get",
        url: "/user/queryUserMessage",
        success: function(data){
            console.log(data);

            $('.mui-media').html(template("tmp",data));
        }
    });

    $(".logout ").on("click", function(){
        $.ajax({
            type: "get",
            url: "/user/logout",
            success: function(data){
                console.log(data);
                if(data.success){
                    location.href = "login.html";
                }
            }
        });
 
    });
});