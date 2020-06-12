<!-- <template>
  <div class="amap-page-container">
    <div :style="{width:'100%',height:'300px'}">
      <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
      </el-amap>
    </div>

      <div class="toolbar">
        <button type="button" name="button" v-on:click="addMarker">add marker</button>

      </div>
  </div>
</template>
<style>
  .amap-demo {
    height: 300px;
  }
</style>
<script>
  export default {
       data(){
         const self = this;
         return {
           center: [113.59996, 34.197646],
           zoom: 8,
          markers: [
            {
              position: [121.5273285, 31.21515044],
              events: {
                click: () => {
                  alert('click marker');
                },
                dragend: (e) => {
                  console.log('---event---: dragend')
                  this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                }
              },
              visible: true,
              draggable: false,
              template: '<span>1</span>',
            }
          ]
         }
       },
       methods:{
           addMarker() {
             let marker = {
               position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
             };
             debugger
             this.markers.push(marker);
           }
       }
  }


</script>
 -->

 <template>
     <div class="amap-page-container" :style="{width:'100%',height:'300px'}">
       <el-amap
         vid="amapDemo"
         :center="center"
         :zoom="zoom"
         :events="events"
         class="amap-demo">
         <el-amap-marker v-for="marker in markers" :extData="marker" :position="marker.position" :events="marker.events"></el-amap-marker>
         <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :template="window.content"></el-amap-info-window>
       </el-amap>
       <button type="button" name="button" v-on:click="addMarker">add marker</button>
       <button type="button" name="button" v-on:click="sendgetAjax">sendGet</button>
       <button type="button" name="button" v-on:click="sendputAjax">sendPost</button>
     </div>

   </template>

   <style>
     .amap-demo {
       height: 300px;
     }

     .prompt {
       background: white;
       width: 100px;
       height: 30px;
       text-align: center;
     }
   </style>

   <script>
     /* import qs from 'qs' */
     export default {
       data() {
         let self = this;
         return {
           zoom: 9,
           center: [113, 34],
           markers: [],
           windows: [],
           window: '',
           events: {
             init: (o) => {
               //console.log(o.getCenter())
               //console.log(this.$refs.map.$$getInstance())
               o.getCity(result => {
                 console.log(result)
               })
             },
             'moveend': () => {
             },
             'zoomchange': () => {
             },
             'click': (e) => {
               /* let { lng, lat } = e.lnglat;
               self.lng = lng;
               self.lat = lat;
               alert(lat);
               // 这里通过高德 SDK 完成。
               var geocoder = new AMap.Geocoder({
                 radius: 1000,
                 extensions: "all"
               });
               geocoder.getAddress([lng ,lat], function(status, result) {
                 if (status === 'complete' && result.info === 'OK') {
                   if (result && result.regeocode) {
                     self.address = result.regeocode.formattedAddress;
                     alert(self.address);
                     self.$nextTick();
                   }
                 }
               }); */
             },
             'rightclick':(e) => {
               let {lng,lat} = e.lnglat;
               this.addMarkerCK(lng,lat);
             }
           }
         };
       },
       methods:{
         sendgetAjax(uri,fun){
           this.$axios.get(uri, {//这里将axios.get 改为this.$axios.get
                       // params:{
                       // 	name:'aa',
                       // 	age:22
                       // }
                       //params: this.user
                     })
                     .then(resp => {
                       console.log(resp);
                       fun(resp.data);
                     }).catch(err => {
                       console.log(err);
                     })
         },
         sendputAjax(uri,data,fun){
           this.$axios.put(uri, {//'http://127.0.0.1:8089/v1.0/poem'

                        "id":"944188077740149",
                        "title":"changan骊山",
                        "author":"杜牧",
                        "time":"唐朝",
                        "detail":"回望长安绣成堆",
                        "smx":"113",
                        "smy":"34",
                        "newAddress":"xian",
                        "oldAddress":"changan"


                     })
                     .then(resp => {
                       console.log(resp);
                       fun(resp.data);
                     }).catch(err => {
                       console.log(err);
                     })
         },
         addMarker(){
           let marker = {
             position: [113, 34],
             events: {
               click() {
                 alert(1);
               }
             }
           }
           this.markers.push(marker);
         },
         addMarkerCK(lng,lat){

           let that = this;
           that.windows = []
           let marker = {
             position: [lng, lat],
             events: {
               click() {
                 let add = that.getAddress(lng,lat,function(add){
                   that.addwindow(lng,lat,add);
                   for(let i = 0;i<that.windows.length;i++){
                     that.windows.forEach(window => {
                                        window.visible = false;
                                      });

                    that.window = that.windows[i];
                    that.$nextTick(() => {
                      that.window.visible = true;
                    });
                   }
                 });
                 //that.addwindow(lng,lat,add);


               }
             }
           }
           this.markers.push(marker);
         },
         addwindow(lng,lat,add){
           let that = this;
           that.windows = [];
           let a = "aa"
           that.windows.push({
             position: [lng,lat],
             content: `<div ref="`+a+`" id="`+a+`" class="prompt" style="height:250px;width:200px">`+lng +`,`+lat+`,`+add+`<input type="text"/><input type="text"/><textarea></textarea><button @click="btnck('`+a+`')">保存</button></div>`,
             visible: true
           });
         },

         getAddress(lng,lat,fun){
           let self = this;
           let address = ""
           // 这里通过高德 SDK 完成。
           var geocoder = new AMap.Geocoder({
             radius: 1000,
             extensions: "all"
           });
           geocoder.getAddress([lng ,lat], function(status, result) {
             if (status === 'complete' && result.info === 'OK') {
               if (result && result.regeocode) {
                 address = result.regeocode.formattedAddress;

                 fun(address)
                 self.$nextTick();
               }
             }
           });

           return address;
         },
         //window中button按钮
         btnck(msg){
           console.log(this.$refs[msg]);
           //保存数据
           
         },
         addMarkers(lng,lat,address){
           let that = this;
           that.windows = []
           let marker = {
             position: [lng, lat],
             data:address,
             events: {
               click(e) {

                 console.log(e.target.getExtData())
                 let datas = e.target.getExtData();
                  let add = that.getAddress(lng,lat,function(add){
                   that.addwindow(datas.position[0],datas.position[1],datas.data);
                   for(let i = 0;i<that.windows.length;i++){
                     that.windows.forEach(window => {
                                        window.visible = false;
                                      });

                    that.window = that.windows[i];
                    that.$nextTick(() => {
                      that.window.visible = true;
                    });
                   }
                 });
                 //that.addwindow(lng,lat,add);


               }
             }
           }
           this.markers.push(marker);
         }
       },
       mounted() {
         let markers = [];
         let windows = [];

         let num = 10;
         let self = this;
         self.sendgetAjax("http://127.0.0.1:8089/v1.0/poem/all",function(data){
           data.data.forEach(function(d){
             if(d.smx != null){
               self.addMarkers(d.smx,d.smy,d.oldAddress);
             }


           });
         });
        /* for (let i = 0 ; i < num ; i ++) {
           markers.push({
             position: [121.59996, 31.197646 + i * 0.001],
             events: {
               click() {
                 self.windows.forEach(window => {
                   window.visible = false;
                 });

                 self.window = self.windows[i];
                 self.$nextTick(() => {
                   self.window.visible = true;
                 });
               }
             }
           });

           windows.push({
             position: [121.59996, 31.197646 + i * 0.001],
             content: `<div class="prompt">${ i }</div>`,
             visible: false
           });
         }

         this.markers = markers;
         this.windows = windows; */
       }
     };
 </script>


<!-- markers.push({
            position: [basePosition[0], basePosition[1] + i * 0.03],
            template: `<button @click="handler(${ i })">{{ source }} ${ i }</button>`
          }); -->

<!-- 单击按钮 -->
<!-- <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo1"
        :center="center"
        :zoom="zoom"
        class="amap-demo">
        <el-amap-info-window :position="window.position" :template="window.template"></el-amap-info-window>
      </el-amap>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        let self = this;

        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          markers: [],
          markerRefs: [],
          source: 'click'
        };
      },

      created() {
        let basePosition = [121.59996, 31.197646];
        this.window = {
          position: [basePosition[0], basePosition[1]],
          template: `<button @click="handler('hello')">{{ source }}</button>`
        }
      },

      methods: {
        handler(index) {
          alert(`${ index } - trigger`);
        }
      }
    };
</script> -->

<!-- 搜索框 -->
<!-- <template>
    <div class="amap-page-container">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
        <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker>
      </el-amap>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }

    .search-box {
      position: absolute;
      top: 25px;
      left: 20px;
    }

    .amap-page-container {
      position: relative;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        return {
          markers: [
            [121.59996, 31.197646],
            [121.40018, 31.197622],
            [121.69991, 31.207649]
          ],
          searchOption: {
            city: '中国',
            citylimit: false
          },
          mapCenter: [121.59996, 31.197646]
        };
      },
      methods: {
        addMarker: function() {
          let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
          let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
          this.markers.push([lng, lat]);
        },
        onSearchResult(pois) {
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push([poi.lng, poi.lat]);
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
          }
        }
      }
    };
</script> -->
