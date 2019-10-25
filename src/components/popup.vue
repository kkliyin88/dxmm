<template>
  <div class="pop-wrap">
    <transition name="cover">
      <div v-if="show" class="cover">
       <!-- <img class='clear' src="@/assets/img/clear.png" @click="close()" alt=""> -->
      </div>
    </transition>
    <transition name="content" >
      <div v-if="show" class="pop-container">
        <template v-if="type == '200'">  <!-- 领取成功 -->
          <img src="@/assets/img/pop/pop1.png" width="100%" alt="">
            <p class='pop_sucess' @click="goToDetails('14945318650','14945318650001')"></p>
          <section class='clear_box' >
            <p class='line' >|</p>
            <p class='line' >|</p>
            <p class='line' >|</p>
            <p class='line' >|</p>
            <div align="center">
              <img class='clear' style="vertical-align: middle" src="@/assets/img/clear.png" @click="close()" alt="">
            </div>
          </section>

        </template>
        <template v-if="type == '5003'"> <!-- 来早了-->
          <img src="@/assets/img/pop/pop4.png" width="100%" alt="">
              <p class='pop_btn' @click="close()"></p>
             <section class='clear_box' >
              <p class='line' >|</p>
              <p class='line' >|</p>
              <p class='line' >|</p>
              <p class='line' >|</p>
              <div align="center">
                <img class='clear' style="vertical-align: middle" src="@/assets/img/clear.png" @click="close()" alt="">
              </div>
            </section>
        </template>
        <template v-if="type == '5004'"> <!-- 来晚了 已领取完 -->
          <img src="@/assets/img/pop/pop5.png" width="100%" alt="">
          <a href="https://m.purcotton.com" >
            <p class='pop_btn pop_btn_4' ></p>
          </a>
           <section class='clear_box' >
            <p class='line' >|</p>
            <p class='line' >|</p>
            <p class='line' >|</p>
            <p class='line' >|</p>
            <div align="center">
              <img class='clear' style="vertical-align: middle" src="@/assets/img/clear.png" @click="close()" alt="">
            </div>
          </section>
        </template>
         <template v-if="type == '5001'"> <!-- 只限丁香会员领取 -->
          <img src="@/assets/img/pop/pop2.png" width="100%" alt="">
            <p class='pop_btn' @click="close()" ></p>
           <section class='clear_box' >
            <p class='line' >|</p>
            <p class='line' >|</p>
            <p class='line' >|</p>
            <p class='line' >|</p>
            <div align="center">
              <img class='clear' style="vertical-align: middle" src="@/assets/img/clear.png" @click="close()" alt="">
            </div>
          </section>
        </template>
        <template v-if="type == '500'" > <!-- 网络问题 -->
          <img src="@/assets/img/pop/pop6.png" width="100%" goservice  alt="">
            <p class='pop_btn' @click='getservice'></p>
           <section class='clear_box' >
            <p class='line' >|</p>
            <p class='line' >|</p>
            <p class='line' >|</p>
            <p class='line' >|</p>
            <div align="center">
              <img class='clear' style="vertical-align: middle" src="@/assets/img/clear.png" @click="close()" alt="">
            </div>
          </section>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import { Toast} from 'vant';
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },

  },
mounted(){
  console.log('type',this.type)
},
  methods: {
    close () {
      this.$emit('closePop')
    },
    getservice(){
      wx.miniProgram.navigateTo({url:'/pages/webview'});
    },
    goToDetails(commodityNo,goodsNo){
          wx.miniProgram.navigateTo({url:'/pages/commodity/detail?commodityNo=' + commodityNo + '&goodsNo=' + goodsNo});
    },  //https://m.purcotton.com/wap/detail/002000003575/P3403G037.html
  }
}
</script>

<style scoped>
.pop-wrap {
  z-index: 1000;
}

.pop_sucess{
  position: absolute;
  bottom: 210px;
 /* border: 1px solid green; */
  width: 65%;
  height: 100px;
 margin-left: 11%;
border-radius: 50px;
}
.pop_btn{
   position: absolute;
   bottom: 460px;
  /* border: 1px solid green; */
  display: block;
    width: 65%;
    height: 100px;
   margin-left: 11%;
  border-radius: 50px;
}
.pop_btn_4{
   bottom: 430px;
}
.cover {
  position: fixed;
 width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .4);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-top: 70vh
}
 .clear_box{
   position: relative;
   width: 95%;
   /* border: 1px solid red; */
   text-align: center;
   height: 150px;
   display:flex;
   flex-direction: column;
   justify-content: center;
   margin-top: -20px;

 }
 .line{
   color: #FFF;
   height: 20px;
   line-height: 20px;
   font-size: 20px;
   margin-top:-5px;
 }

  img.clear{
  height: 40px;
  width: 40px;
}
.pop-container {
  position: fixed;
  width: 100%;
  padding: 0 5vw;
  box-sizing: border-box;
  left: 0;
  top: 20vw;
}

</style>
