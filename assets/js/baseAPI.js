var baseURL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function (options) {


    // 拼接路径
    options.url = baseURL + options.url;
    // 判断路径中是否包含/my/   包含就增加请求头信息
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }

    // 请求完成后进行身份认证
    // 已经退出不能直接在地址框中输入地址进入页面，需要重新进行登录
    options.complete = function (res) {
        var data = res.responseJSON;
        console.log(data);

        if (data.status == 1 && data.message == '身份认证失败！') {
            localStorage.removeItem('token'); //清除token
            location.href = '../../login.html';
        }
    }

})