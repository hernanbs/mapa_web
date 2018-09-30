<template>
    <div >
      <olMap :map="map" :ref="olMap"></olMap>
      <toolButton></toolButton>
    </div>
</template>
<script>
// import ol from "openlayers"
import Map from './Map/Map'
// import Basemap from './tools/Basemap/Basemap'
import toolButton from './toolButton/toolButton.vue'
export default {
  name: 'index',
  data: () => ({
    map: this.$refs["olMap"].map
  }),
  components: {
    olMap: Map,
    toolButton: toolButton,
  },
  mounted() {
    console.log("iinde")
    console.log(this)
    console.log(this.$refs["olMap"].map)
    
  }
}
</script>
<style>
</style>
