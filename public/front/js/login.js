$(function(){
    $(".btn-login").on("click",function(){
        var username = $("[name = 'username']").val();
        var password = $("[name = 'password']").val();

        if(!username){
            mui.toast("请输入用户名");
            return false;
        }
        if(!password){
            mui.toast("请输入密码");
            return false;
        }

        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username: username,
                password:password
            },
            success: function(data){
                // console.log(data);
                if(data.success){
                    var search = location.search;
                    if(search.indexOf('retUrl') == -1){
                        location.href = "userinfo.html";
                    }
                    else{
                        search = search.replace("?retUrl=","");
                        location.href = search;
                    }
                }else if(data.error === 403){
                    mui.toast(data.message);
                }
            }
        });
    });
});