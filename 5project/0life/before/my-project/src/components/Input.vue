<template>
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
</script>