<template>
    <div>
      <olMap ></olMap>
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
  components: {
    olMap: Map,
    toolButton: toolButton
  }
}
</script>
<style>
</style>
