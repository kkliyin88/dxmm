``` bash
## 本项目使用vue+webpack+axios(稍微封装)+v-load(图片懒加载)
## 本项目在webpack->config->index.js dev模块里面配置了代理
## 在dev.env.js里面添加了变量 API_ROOT:'"/apis"'   //本地域名
## 在prod.env.js里面添加了变量 API_ROOT:'"https://m.purcotton.com"' //线上后端接口域名
## 在文件夹axios->url.js里面添加let baseUrl = process.env.API_ROOT;//dev和build环境这个变量(域名)不一样 配置不同环境下接口域名不一样
## 图片懒加载需要注意的事：<img v-lazy="img19" alt=""> img19：是data里面的数据；需要引入本地图片import img19 from '../assets/img/lbhx/mzh19.jpg'；如果是远程地址的图片即可直接放或通过接口获取
## export，import ，export default作用：1、在一个文件或模块中，export、import可以有多个，export default仅有一个；2、通过export方式导出，在导入时要加{ }，export default则不需要；3、export与export default均可用于导出常量、函数、文件、模块等；详情可以参见axios里面的js文件。

npm install

## serve with hot reload at localhost:8080
npm run dev

## build for production with minification
npm run build
```