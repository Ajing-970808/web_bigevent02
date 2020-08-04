$(function () {

    getUserInfo();

    // 退出登录
    $('#btnLogout').on('click', function () {
        // 用户按退出弹出确认提示框
        layer.confirm('是否确认退出？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            layer.close(index); //关闭提示框
            localStorage.removeItem('token'); //确认退出删除token
            // 跳转到登录页面
            location.href = '../../login.html';
        })
    })



    // 封装一个获取用户信息函数
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败！')
                // 获取成功后渲染头像
                renderAvatar(res.data)
            }
        })
    }

    // 封装一个渲染名字和头像的函数
    function renderAvatar(user) {
        // 渲染名字
        var name = user.username || user.nickname;
        $('#welcome').html(name);
        // 渲染头像

        if (user.user_pic !== null) {
            // 用户有头像渲染图片头像   并显示图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show();
            // 隐藏文字头像
            $('.text-avatar').hide();
        } else {
            // 如果用户没有头像则渲染文字头像   显示文字头像
            var textAvatar = name[0].toUpperCase();
            $('.text-avatar').html(textAvatar).show();
            $('.layui-nav-img').hide();
        }
    }




})