<template>
  <div>
    <h4>Lista de camadas disponiveis</h4>
    <hr noshade/>
    <div>primeira camada</div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import configuration from './../../../config'
import ol from 'openlayers'

export default {
  name: 'layer',
  data: () => ({
    config: configuration,
    sr_camadas: undefined,
    camadasLigadas: undefined
  }),
  computed: {
    ...mapState(['map', 'basemap'])
  },
  methods: {
    ...mapActions(['changeMap', 'changeBaseMap'])
  },
  mounted () {
    this.sr_camadas = new ol.source.TileWMS({
      url: this.config.url.ibge,
      params: {'LAYERS': 'CCAR:BC250_Pais_A', 'TILED': true},
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    })
    this.camadasLigadas = new ol.layer.Tile({
      source: this.sr_camadas
    })
    console.log(this)
    this.map.addLayer(this.camadasLigadas)
  }
}
</script>
<style lang="stylus">
</style>
