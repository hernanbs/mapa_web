//var jQuery = require('jquery');
//var mclic = require('../module_click/module_click.js');
// mclic = mclic.init(ol);
var ol = require('openlayers');
var mlayer = require("./modulo_layer.js");

var modulo_mapa = ( function (ol, mlayer) {
    var zoomSlider = new ol.control.ZoomSlider();
    var rotacao = new ol.control.Rotate();
    var mousePosition = new ol.control.MousePosition({
        projection:"EPSG:4326",
        target:"posicaoMouse"
    });
    var control = new  ol.control.defaults().extend([mousePosition,zoomSlider,rotacao]);
    var view = new ol.View({
        projection:"EPSG:4326",
        center:[-47.9292,-15.7801] ,
        zoom:4
    })
    var map = null;
    var map = new ol.Map({
        controls: control,
        layers:[mapa_fundo],
        target:'map',
        view: view
    });
    return{
        map:map,
    }
})(ol, mlayer);
if (typeof require != 'undefined')
    module.exports = modulo_mapa;

$(document).ready(function(){
    console.log(modulo_mapa.map)
})