$(function(){

    var currentPage = 1;
    var pageSize = 5;

    // 请求数据（分页）
    function render(){
        $.ajax({
            type:"get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function(data){
            //    console.log(data); 
                $("tbody").html(template("tmp", data));
    
                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//指定bootstrap的版本，如果是3，必须指定
                    currentPage: currentPage,//指定当前页
                    totalPages: Math.ceil(data.total / pageSize),//指定总页数
                    size: "small",//设置控件的大小
                    onPageClicked: function (a, b, c, page) {
                    //page指的是点击的页码,修改了当前页
                    currentPage = page;
                    //重新渲染
                    render();
                    }
                });
            }        
        });
    }
    render();

    // 禁用启用功能
    $("tbody").on("click",".btn",function(){
        // 初始化模态框，让其弹出显示
        $("#userModal").modal("show");

        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

        // off()解绑当前元素绑定的事件
        $(".btn_edit").off().on("click", function(){
            $.ajax({
                type:"post",
                url: "/user/updateUser",
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function(data){
                    // console.log(data);
                    if(data.success){
                        $("#userModal").modal("hide");
                        render();
                    }
                }
            });
        });
    });

});