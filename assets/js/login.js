$(function () {
    // 点击去注册切换到注册页面
    $('#link-reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    // 点击去登录切换到登录页面
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        rePwd: function (value) {
            var rePwd = $('.reg-box [name=password]').val();
            if (rePwd !== value) return '两次密码不一致';
        }
    });

    // 注册页面表单提交事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg('注册失败！');
                layer.msg('注册成功！');
                // 注册成功之后跳转到登录页面
                $('#link-login').click();
                // 清空注册页面的表单内容   
                // reset()是原生js方法,所以这里要将$('#form-reg')转换成dom对象--->$('#form-reg')[0]
                $('#form-reg')[0].reset();
            }
        })
    })
    // 登录页面表单提交事件
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('#form-login').serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('登录失败！');
                layer.msg('登录成功！');
                // 这里保存token是用来标识用户登录的令牌
                // 后台index.html需要用户登录之后才能查阅，判断是否为登录状态
                // 权限校验：判断后台index.html请求头里面是否有token
                localStorage.setItem('token', res.token);
                // 登录成功之后跳转到index.html
                location.href = '../../index.html';
            }
        })





    })




})