$(function () {
    $form = $("form");
    // 校验表单
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback: {
                        message: "用户名错误"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength:{
                      min:6,
                      max:12,
                      message:"密码长度是6-18位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    });

    // 给表单注册一个校验成功事件
    $form.on("success.form.bv", function(e){
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            // serialize()方法可以输出序列化表单值的结果
            data: $form.serialize(),
            success: function(data){
                console.log(data);
                if(data.success){
                   location.href = "index.html" 
                }
                if(data.error === 1000) {
                    $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if(data.error === 1001) {
                    $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
            }
        });
    });

    $("[type = 'reset']").on("click", function(){
        // 重置表单
        $form.data("bootstrapValidator").resetForm();
    });
});