import { fetch } from "./fetch"; //引用fetch.js

let baseUrl = process.env.API_ROOT;//dev和build环境这个变量(域名)不一样
// let activityid=baseUrl == '/apis' ? '18' : '110';//0元领活动id  测试：16  正式：61
export default{
  sendmobileCode : (mobile) => fetch({//发送短信
    url: baseUrl+'/mall/dingxiangmama/messageCode.ihtml',
    method: 'post',
    params:{
      phone:mobile
    }
  }),
  getCoupon : (mobile,smsCode,token) => fetch({//领券注册
    url: baseUrl+'/mall/dingxiangmama/puzzleRegister.ihtml',
    method: 'post',
    params:{
      phone:mobile,
      code:smsCode,
      token,
    }
  }),
  toCheckLogined : () => fetch({//判断wap端是否登录
    url: baseUrl+'/mall/activityNewMembers/tocheckshopping.ihtml',
    method: 'post',
    params:{}
  })
}
