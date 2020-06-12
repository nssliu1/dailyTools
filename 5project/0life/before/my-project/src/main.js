// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAMap from 'vue-amap';
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  //key: '3215b5f84e4fab2545b0e45c6be70be0',
  key:'160cab8ad6c50752175d76e61ef92c50',
  plugin: [
      "AMap.Autocomplete", //输入提示插件
      "AMap.PlaceSearch", //POI搜索插件
      "AMap.Scale", //右下角缩略图插件 比例尺
      "AMap.OverView", //地图鹰眼插件
      "AMap.ToolBar", //地图工具条
      "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
      "AMap.PolyEditor", //编辑 折线多，边形
      "AMap.CircleEditor", //圆形编辑器插件
      "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
      "AMap.Geocoder"
    ],
  v: '1.4.4'
});

import axios from 'axios';
Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
