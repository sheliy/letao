
    // 关闭进度条
    NProgress.configure({showSpinner: false});
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },500);
    });

    // 非登录页面发送ajax请求
    if(location.href.indexOf("login.html") == -1){
        $.ajax({
            type:"get",
            url:"/employee/checkRootLogin",
            success: function(data){
                if(data.error === 400){
                    location.href = "login.html";
                }
            }
        });
    }

    // 二级菜单显示隐藏
    $(".submenu").prev().on("click",function(){
        $(this).next().slideToggle();
    });

    // 侧边栏显示隐藏
    $(".btn-menu").on("click", function(){
        $(".lt_aside").toggleClass("now");
        $(".lt_main").toggleClass("now");
    })


    $(".btn_logout").on("click",function(){
        $("#logoutModal").modal("show");

        $(".btn-confirm").off().on("click", function(){
            $.ajax({
                type: "get",
                url: "/employee/employeeLogout",
                success: function(data){
                    if(data.success){
                        location.href = "login.html";
                    }
                }
            });
        });
    });
