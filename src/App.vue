<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body, div, span, object, iframe, a, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, menu, nav, section, summary, time, mark, audio, video{
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
html,body{
  max-width: 750px;
  margin: 0 auto;
}
.clearfix{
    display: block;
    clear: both;
}
.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}
::-webkit-input-placeholder {
  color: #999;
}
:-moz-placeholder {
  color: #999;
}
::-moz-placeholder {
  color: #999;
}
::-ms-input-placeholder {
  color: #999;
}
img {
  width: 100%;
  border: none;
  display: block;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #d1cdfa;
}
.van-toast{
  font-size: 30px !important;
  padding: 26px !important;
}
</style>
