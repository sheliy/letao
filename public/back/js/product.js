$(function(){
    var currentPage = 1;
    var pageSize = 5;

    function render(){
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page:currentPage,
                pageSize: pageSize
            },
            success: function(data){
                console.log(data);
    
                $("tbody").html(template("tmp", data));
    
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(data.total / pageSize),
                    currentPage: currentPage,
                    onPageClicked: function(a, b, c, page){
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }

    render();

    // 添加商品
    $(".btn_add").on("click", function(){
        $("#addModal").modal("show");
        $.ajax({
                    type: "get",
                    url: "/category/querySecondCategoryPaging",
                    data: {
                        page: 1,
                        pageSize: 100
                    },
                    success: function(data){
                        console.log(data);

                        $(".dropdown-menu").html(template("litmp", data));
                    }
                });
        
    });

    $(".dropdown-toggle").on("click",function(){
        
    });
});