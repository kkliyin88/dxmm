import Vue from 'vue'
import axios from 'axios'//引入axios 方便访问接口

import wx from 'weixin-js-sdk'

import VueLazyload from 'vue-lazyload' //引入图片懒加载

Vue.prototype.$http = axios;
Vue.prototype.$wx = wx;

Vue.use(VueLazyload);

import { Popup } from 'vant';//引入vant弹窗
Vue.use(Popup);

import { Row, Col } from 'vant';
Vue.use(Row).use(Col);

//手机号码验证
Vue.prototype.$validationPhone = function(phone){
    var getMobile = phone;
    var temp = "";
    var myreg = /^0?(13|14|15|16|17|18|19)[0-9]{9}$/;
    if (getMobile.length == 0) {
        return temp = "手机号码不能为空";
    }else if (getMobile.length != 11) {
        return temp = "请输入11位有效的手机号码";
    }else if (!myreg.test(getMobile)) {
        return temp = "请输入有效手机号";
    }else{
        return temp;
    }
};