<template>
    <div >
      <olMap></olMap>
    </div>
</template>
<script>
// import ol from "openlayers"
import Map from './Map/Map'
export default {
  name: 'index',
  components: {
    olMap: Map
  }
}
</script>
<style>
</style>
