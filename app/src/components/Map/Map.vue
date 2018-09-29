<template>
    <div>
        <div id="map"></div>
    </div>
</template>
<script>

import ol from 'openlayers'
import configuration from './../../config'

export default {
  name: 'map',
  data: () => ({
    mapReady: false,
    map: undefined,
    controls: undefined,
    mousePositionControl: undefined,
    rotateControl: undefined,
    zoomSliderControl: undefined,
    view: undefined,
    // brasilia = "lat -15° 46' 47'' ,  long -47° 55' 47''"
    coordInitial: [-47.9292, -15.7801],
    projectionInitial: 'EPSG:4326',
    basemap: undefined,
    sr_World: undefined,
    config: configuration
  }),
  mounted () {
    this.mapReady = true
    this.mousePositionControl = new ol.control.MousePosition({
      projection: this.projectionInitial,
      target: 'posicaoMouse'
    })
    this.rotateControl = new ol.control.Rotate()
    this.zoomSliderControl = new ol.control.ZoomSlider()
    this.controls = ol.control.defaults().extend([
      this.mousePositionControl,
      this.zoomSliderControl,
      this.rotateControl
    ])
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
    this.basemap = new ol.layer.Tile({
      source: this.sr_World,
      visible: true
    })
    this.map = new ol.Map({
      controls: this.controls,
      layers: [this.basemap],
      target: 'map',
      view: this.view
    })
    console.log(this)
    console.log('fim')
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
</style>
