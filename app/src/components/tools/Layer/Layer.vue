<template>
  <div>
    <h4>Lista de camadas disponiveis</h4>
    <hr noshade/>
    <div id="camadas">
      <div v-for="(item, index) in list">
        <input :id="'layer-'+index" type="checkbox" />
        <label :for="'layer-'+index" >{{item.text}}</label>
      </div>
    </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import configuration from './../../../config'
import ol from 'openlayers'
import { layerList } from './layerList'

export default {
  name: 'layer',
  data: () => ({
    config: configuration,
    //a: list,
    sr_camadas: undefined,
    camadasLigadas: undefined,
    layerCollection: [],
    list: layerList,
  }),
  computed: {
    ...mapState(['map', 'basemap'])
  },
  methods: {
    createLayerCollection () {
      for (let item in layerList) {
        let source
        source = new ol.source.TileWMS({
          url: layerList[item].url,
          params: layerList[item].params
        })
        this.layerCollection.push(new ol.layer.Tile({
          source: source,
          visible: layerList[item].defaultVisible,
        }))
      }
      for (let i=0; i < this.layerCollection.length; i++) {
        this.map.addLayer(this.layerCollection[i])
      }
    },
    ...mapActions(['changeMap', 'changeBaseMap'])
  },
  mounted () {
    this.createLayerCollection()
    // transferir createLayerCollection para mount pricipal do site
    // checkbox deve mudar visibilidade de camadas
    // adicionar state de lista de camadas ativas e totais
  }
}
</script>
<style lang="stylus">
</style>
