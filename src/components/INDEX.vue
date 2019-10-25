<template>
  <div>
    <div>
      <img src="@/assets/img/1.jpg" alt="">
    </div>
    <!-- 领取成功部分 -->
    <div class="result-box" v-if="resultType == 1"> <!-- v-if="resultType == 1" -->
      <p class="result-txt1">恭喜{{callbackphone}}</p>
      <p class="result-txt1">您已获得丁香妈妈会员心意礼盒兑换券</p>
      <div class="result-btns">
        <a @click="goToDetails('14945318650','14945318650001')" class="result-btn1">立即使用></a>
        <a @click='gotoMylist' class="result-btn2">查看我的订单></a>
      </div>
    </div>
    <div class="lyd">
      <img src="@/assets/img/2.jpg" alt=''>
    </div>
    <!-- 输入框部分 -->
    <div class="content-box" v-if="resultType == 0">
      <div class="content">
        <div class="con-tit">登录/注册 全棉时代会员即可领取礼包</div>
        <div class="input">
          <span class="icon icon1"></span>
          <input type="tel" placeholder="请输入手机号" @blur="onFieldBlur" class="userphone" id="userphone" v-model="userphone" name="userphone">
        </div>
        <div class="agreement-wrap clearfix">
          <a href="javascript:;" v-bind:class="getAgreeClassObject" id="agreeBtn"  @click="getAgreeBtn" v-bind:data-agree="getRegstAgreeNum"></a>
          <a :href="userRegisterProtocolLink" class="agree-link">同意<span class="green">《全棉时代用户注册协议》</span></a>
        </div>
        <div class="submit-btn-wrap">
          <van-button v-bind:class="getSubmitRegstClassObject" size='large' text='一键get专享福利' @click="submitRegst(userphone)" :loading="loading" id="submitRegst" loading-text="提交中"> </van-button>
        </div>
      </div>
    </div>
    <div class="rule-box">
      <h1 class="rule-txt1">活动规则：</h1>
      <p class="rule-txt2">1、丁香妈妈会员心意礼盒兑换活动时间：2019年10月25日-11月12日；</p>
      <p class="rule-txt2">2、活动期间成功开通丁妈会员即可免费获得全棉时代提供的价值199元实物礼包1份，以及全棉时代官方商城专享双11优惠券（双11全场通用）；</p>
      <p class="rule-txt2">3、活动期间每个用户id仅限领取一份福利；</p>
      <p class="rule-txt2">4、温馨提示：199元心意礼包将于11月5日之后陆续发货，发货后将第一时间短信通知您；</p>
      <p class="rule-txt2">5、如有任何疑问，可联系丁香在线客服答疑。</p>
    </div>
    <!-- 弹窗 -->
    <div v-if='showPop'>
      <Popup :show='showPop' :type='showType'  @closePop='() => showPop = false' />
    </div>

  </div>
</template>

<script>
import api from '@/axios/api.js';
import { get } from '@/axios/fetch';
import { Toast} from 'vant';
import Popup from './popup'
import './index.css'
export default {
  data () {
    return {
      baseUrl: process.env.API_ROOT,
      resultType: 0,//是否领取 默认0  1成功领取
      userphone: '',
      callbackphone:'',
      account:'',
      getRegstAgreeNum: "1",//同意协议
      getAgreeClassObject: { "agree-img": true, agree: true, unagree: false },
      userRegisterProtocolLink: 'https://m.purcotton.com/wap/user_register_protocol.html',
      getSubmitRegstClassObject: { "submit-btn": true, gray: false },
      submitBtnNum: "1",
      submitRegstTxt: "一键get专享福利 >",
      token: "",
      loading:false,
      showPop: false,
      showType: 'null',
    }
  },
  watch: {//监控输入框输入长度
    userphone() {
      if (this.userphone.length > 11) {
          this.userphone = String(this.userphone).slice(0, 11);
      }
    }
  },
  created(){

  },
  components: {
      Popup,
    },
  mounted() {
    this.getUrlParm();
    //隐藏分享功能
    wx.hideMenuItems({
      menuList: []
    });
     //这里监听键盘收起，然后滚动顶部;
    document.body.addEventListener('focusout', () => {
      //软键盘收起的事件处理
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('iphone') > 0 || ua.indexOf('ipad') > 0) {  //键盘收齐页面空白问题
        document.body.scrollTop = document.body.scrollHeight;
      }
    });
  },
  methods:{
     getUrlParm(name){ //获取丁香妈妈的token
        var url = window.location.href;
        var search = url.split('?')[1];
        if(search) search = search.split('=')[1];
        if(search){
          this.token =search.split('').filter((item) =>{
           return item !== '/' && item !== '#'
           }).join('')
        }
    },
    gotoMylist(){
      wx.miniProgram.navigateTo({url:'/pages/order/list'});
    },
    goToDetails(commodityNo,goodsNo){
          wx.miniProgram.navigateTo({url:'/pages/commodity/detail?commodityNo=' + commodityNo + '&goodsNo=' + goodsNo});
    },  //https://m.purcotton.com/wap/detail/002000003575/P3403G037.html
    submitRegst(phoneNum) {
      let tmpeMsg = this.$validationPhone(this.userphone);//手机号码
      let regstAgreeNum = this.getRegstAgreeNum;//同意协议
      	if(tmpeMsg){
      	Toast(tmpeMsg);
        return
      }else if(regstAgreeNum == '0'){
        Toast("请同意全棉时代用户注册协议");
        return
       }
       let url = '/api/member/webpage/register?phone='+phoneNum;
      this.loading = true;
      get(url).then(res => {
        this.loading = false;
        if(res.code=='200'){
          this.account = res.data.account;
          this.callbackphone = res.data.phone.substr(0,3)+ '****' + res.data.phone.substr(-4);
          let getconpontype_url =  '/api/member/find/coupon/receiveDxmm'
          this.getCouponType(getconpontype_url,this.token,this.account)
        }
      }).catch((error)=>{
         this.phoneExit(phoneNum) //号码已经注册
         this.loading = false;
      })
    },
   phoneExit(phoneNum){
       let url = '/api/member/webpage/phone?phone='+ phoneNum;
        this.loading = true;
      get(url).then(res => {
        this.loading = false;
        if(res.code=='200'){
          this.account = res.data.account;
          this.callbackphone = res.data.phone.substr(0,3)+ '****' + res.data.phone.substr(-4);
          let getconpontype_url ='/api/member/find/coupon/receiveDxmm'
          this.getCouponType(getconpontype_url,this.token,this.account)
        }
      }).catch(()=>{
        this.loading = false;
      })
   },
     getCouponType(url,token,account){  //获取优惠券类型
         let query = '?token='+token + '&memberAccount='+account;
         let url1 = url + query
         this.loading = true;
         get(url1).then(res => {
           this.loading = false;
           this.showType = res.code;
           if(this.showType=='201'){  //如果已领取，不弹窗
              this.resultType = 1;
           }
           //如果已领取，不弹窗
           if(this.resultType==0) this.showPop = true;
         }).catch(()=>{
           //网络问题咨询客服
           this.showType=='500';
           this.showPop = true
           this.loading = false;
         })
     },

    //是否同意协议
    getAgreeBtn() {
      if (this.getAgreeClassObject.agree == true) {
        this.getAgreeClassObject.agree = false;
        this.getAgreeClassObject.unagree = true;
        this.getRegstAgreeNum = "0";
      } else if (this.getAgreeClassObject.agree == false) {
        this.getAgreeClassObject.agree = true;
        this.getAgreeClassObject.unagree = false;
        this.getRegstAgreeNum = "1";
      }
    },

    // 解决ios键盘错位问题
    onFieldBlur(){
      let browser = {
          versions: function() {
              let u = navigator.userAgent;
              return {
                  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              };
          }()
      };
      if(browser.versions.ios){
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
          window.scrollTo(0, Math.max(scrollHeight - 1, 0))
        }, 100)
      }
    },
  }
}
</script>

<style scoped>

</style>
