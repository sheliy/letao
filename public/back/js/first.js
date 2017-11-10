$(function(){
    var currentPage = 1;
    var pageSize = 5;
    
    function render(){
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function(data){
                // console.log(data);
                $("tbody").html(template("tmp", data));
    
                //初始化分页的控件
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    onPageClicked: function(a, b, c, page){
                        currentPage = page;
    
                        render();
                    }
                });
            }
        });
    }

    render();

    // 点击添加，显示模态框
    $(".btn_add").on("click", function(){
        $("#addModal").modal("show");
    });

    // 表单校验
    var $form = $("form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类"
                    }
                }
            }
        }
    });

    $form.on("success.form.bv", function(e){
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $form.serialize(),
            success: function(data){
                if(data.success){
                    $("#addModal").modal("hide");

                    currentPage = 1;
                    render();

                    $form.data("bootstrapValidator").resetForm();

                    $form[0].reset();
                }
            }
        });
    })
});
