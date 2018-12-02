<template>
  <div>
    <h4>Mapas de fundo disponíveis</h4>
    <hr noshade/>
    <div class="btn-group-vertical">
      <div @click="getNewBaseMap('osm')"
       :class="[mapSelected === 'osm' ? 'active ':'', 'btn', 'btn-outline-success']">OpenStreetMap</div>
      <div @click="getNewBaseMap('topomap')"
       :class="[mapSelected === 'topomap' ? 'active ':'', 'btn', 'btn-outline-success']">OpenTopoMap</div>
      <div @click="getNewBaseMap('starmen')"
       :class="[mapSelected === 'starmen' ? 'active ':'', 'btn', 'btn-outline-success']">Negrito</div>
      <div @click="getNewBaseMap('world')"
       :class="[mapSelected === 'world' ? 'active ':'' , 'btn', 'btn-outline-success']">World</div>
      <div @click="getNewBaseMap('none')"
       :class="[mapSelected === 'none' ? 'active ':'' , 'btn', 'btn-outline-success']"  >Nada</div>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import configuration from './../../../config'
import ol from 'openlayers'

export default {
  name: 'basemap',
  data: () => ({
    config: configuration,
    mapSelected: undefined,
    sr_osm: undefined,
    sr_starmen: undefined,
    sr_World: undefined,
    sr_TopoMap: undefined
  }),
  computed: {
    ...mapState(['map', 'basemap'])
  },
  methods: {
    clicando (item) {
      console.log(this)
      console.log(this.map)
      console.log(item)
    },
    getNewBaseMap (option) {
      this.mapSelected = option
      console.log(option)
      console.log('base ' + this.basemap)
      console.log(this.basemap)
      switch (option) {
        case 'starmen':
          this.basemap.setSource(this.sr_starmen)
          // this.changeBaseMap(this.sr_starmen)
          break
        case 'osm':
          this.basemap.setSource(this.sr_osm)
          // this.changeBaseMap(this.sr_osm)
          break
        case 'topomap':
          this.basemap.setSource(this.sr_TopoMap)
          // this.changeBaseMap(this.sr_osm)
          break
        case 'world':
          this.basemap.setSource(this.sr_World)
          // this.changeBaseMap(this.sr_World)
          break
        case 'none':
          this.basemap.setSource(undefined)
          break
      }
    },
    ...mapActions(['changeMap', 'changeBaseMap'])
  },
  mounted () {
    this.sr_osm = new ol.source.OSM()
    this.sr_starmen = new ol.source.Stamen({
      layer: 'toner'
    })
    this.sr_World = new ol.source.TileArcGISRest({
      ratio: 1,
      params: {},
      url: this.config.url.arqgis.WORLD
    })
    this.sr_TopoMap = new ol.source.XYZ({
      url: this.config.url.serpro.TOPOMAP,
      attributions: 'Serpro'
      // Errado, necessario mudar modo de carregar basemap e seu tipo de tilelayer
    })
  }
}
</script>
<style lang="stylus">
</style>
