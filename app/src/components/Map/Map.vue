<template>
    <div>
        <div id="map"></div>
        <div class="bla">
          <span class="zoom-number">Zoom: {{getZoom()}}</span>
          <span class="coord-number">{{getCoordView()}}</span>
          <div id="posicaoMouse" hidden></div>
        </div>
    </div>
</template>
<script>

import ol from 'openlayers'
import configuration from './../../config'

import { mapState, mapActions } from 'vuex'
// import store from '@/store'

export default {
  name: 'map',
  data: () => ({
    tempMap: {},
    actualCoordinate: undefined,
    tempBaseMap: {},
    mapReady: false,
    controls: undefined,
    mousePositionControl: undefined,
    rotateControl: undefined,
    zoomSliderControl: undefined,
    view: undefined,
    // brasilia = "lat -15° 46' 47'' ,  long -47° 55' 47''"
    coordInitial: [-47.9292, -15.7801],
    projectionInitial: 'EPSG:4326',
    sr_World: undefined,
    config: configuration
  }),
  computed: {
    ...mapState(['map', 'basemap'])
  },
  methods: {
    getZoom () {
      if (typeof this.map.getView === 'function') {
        return Math.round(this.map.getView().getZoom())
      }
      return -1
    },
    getCoordView () {
      if (this.actualCoordinate) {
        return 'Lat ' + this.actualCoordinate[1] + ', Long ' + this.actualCoordinate[0]
      }
      return []
    },
    ...mapActions(['changeMap', 'changeBaseMap'])
  },
  mounted () {
    this.mapReady = true
    this.mousePositionControl = new ol.control.MousePosition({
      projection: this.projectionInitial,
      target: 'posicaoMouse',
      className: 'posicaoMouseClass',
      label: '',
      collapseLabel: '',
      collapsed: false,
      collapsible: false,
      coordinateFormat: (coord) => {
        this.actualCoordinate = coord
        return 'Lat ' + this.actualCoordinate
      }
    })
    this.rotateControl = new ol.control.Rotate()
    this.zoomSliderControl = new ol.control.ZoomSlider()
    this.zoomControl = new ol.control.Zoom()
    this.blap = new ol.control.ZoomToExtent()
    // this.controls = [
    //   this.mousePositionControl,
    //   this.zoomSliderControl,
    //   this.rotateControl,
    //   this.zoomControl,
    //   new ol.control.Attribution({collapsible:false,collapsed:false}),
    // ]
    this.controls = new ol.control.defaults({attribution: false}).extend([
      this.mousePositionControl,
      this.zoomSliderControl,
      this.rotateControl
      // this.zoomControl,
      // new ol.control.Attribution({ collapsible: false, collapsed: false })
    ])
    // var c = new ol.control.defaultControls({attributionOptions: {collapsible: false}}).extend([this.mousePositionControl,this.zoomSliderControl,this.rotateControl])

    this.view = new ol.View({
      projection: this.projectionInitial,
      center: this.coordInitial,
      zoom: 4
    })
    this.sr_World = new ol.source.TileArcGISRest({
      ratio: 1,
      params: {},
      url: this.config.url.arqgis.WORLD
    })
    this.tempBaseMap = new ol.layer.Tile({
      source: this.sr_World,
      visible: true
    })
    this.changeBaseMap(this.tempBaseMap)
    this.tempMap = new ol.Map({
      controls: this.controls,
      layers: [this.basemap],
      target: 'map',
      view: this.view
    })
    this.changeMap(this.tempMap)
    console.log(this)
    console.log('sadasdsadad')
    console.log(ol)
  }
}
</script>
<style>

#map{
    width: 100vw;
    height: 100vh;
}
#map .ol-zoom .ol-zoom-in,
#map .ol-zoom .ol-zoom-out,
#map .ol-zoomslider button{
  background-color: white;
  color: #28a745;
}
#map .ol-zoom .ol-zoom-out {
    margin-top: 204px;
}
#map .ol-zoomslider {
  background-color: transparent;
  top: 2.3em;
}
#map .ol-touch .ol-zoom .ol-zoom-out {
  margin-top: 212px;
}
#map .ol-touch .ol-zoomslider {
  top: 2.75em;
}
#map .ol-zoom-in.ol-has-tooltip:hover [role=tooltip],
#map .ol-zoom-in.ol-has-tooltip:focus [role=tooltip] {
  top: 3px;
}
#map .ol-zoom-out.ol-has-tooltip:hover [role=tooltip],
#map .ol-zoom-out.ol-has-tooltip:focus [role=tooltip] {
  top: 232px;
}
.posicaoMouseClass{
  background: black;
  color: white;
  bottom: 0;
  position: absolute;
  /* min-width: 25%; */
  /* min-height: 4%; */
  padding-right: 1vw;
  padding-left: 1vw;
}
.bla{
    width: 100%;
    height: 34px;
    position: absolute;
    bottom: 0px;
}
.zoom-number{
  left: 0px;
  bottom: 5px;
  background: white;
  color: black;
  left: 6px;
  position: fixed;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
  border: 3px solid #28a745;
  font-family: monospace;
  font-weight: bold;
}
.coord-number{
  width: 28vw;
  bottom: 5px;
  background: white;
  color: black;
  right: 6px;
  position: fixed;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
  border: 3px solid #28a745;
  font-family: monospace;
  font-weight: bold;
}
</style>
