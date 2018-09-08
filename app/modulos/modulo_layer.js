
var ol = require('openlayers');

var modulo_layer = ( function (ol) {
    let url = {
        WORLD:"https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer",
        LIMITES_CIDADES:"http://mapasinterativos.ibge.gov.br/arcgis/rest/services/RECORTES/MapServer",
        CAPITAL:"http://mapasinterativos.ibge.gov.br/arcgis/rest/services/LOCALIDADES/MapServer",
        BIOMA:"http://mapasinterativos.ibge.gov.br/arcgis/rest/services/BIOMA/MapServer",
        CLIMA:"http://mapasinterativos.ibge.gov.br/arcgis/rest/services/CLIMAS/MapServer",
        //http://www.geoservicos.ibge.gov.br/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers=CGEO:AmazoniaLegalLimites
        //http://www.geoservicos.ibge.gov.br/geoserver/CCAR/wms?service=WMS&version=1.1.0&request=GetMap&layers=CCAR:BC250_Municipio_A&styles=&bbox=-73.9904499689999,-33.752081271,-28.8359076289999,5.27184107700009&width=512&height=442&srs=EPSG:4674&format=application/openlayers
        //http://www.geoservicos.ibge.gov.br/geoserver/CCAR/wms?service=WMS&version=1.1.0&request=GetMap&layers=CCAR:BC250_Pais_A&styles=&bbox=-73.9904499689999,-33.752081271,-28.8359076289999,5.27184107700009&width=512&height=442&srs=EPSG:4674&format=application/openlayers
        //http://www.geoservicos.ibge.gov.br/geoserver/CCAR/wms?service=WMS&version=1.1.0&request=GetMap&layers=CCAR:BCIM_Outros_Limites_Oficiais_L&styles=&bbox=-53.3730697631836,-37.6284484863281,-25.2909469604492,9.26184558868408&width=306&height=512&srs=EPSG:4674&format=application/openlayers
        //http://www.geoservicos.ibge.gov.br/geoserver/CCAR/wms?service=WMS&version=1.1.0&request=GetMap&layers=CCAR:BC250_Unidade_Federacao_A&styles=&bbox=-73.9904499689999,-33.752081271,-28.8359076289999,5.27184107700009&width=512&height=442&srs=EPSG:4674&format=application/openlayers
    };
    var source = {
        arcgis:{
            WORLD: new ol.source.TileArcGISRest({
                ratio: 1,
                params: {},
                url: url.WORLD
            }),
        }
    }
 
    var layer = {
        mapa_fundo:new ol.layer.Tile({
            source: source.arcgis.WORLD,
            visible:true
        }),
    }

    
    return{
        url:url,
        source:source,
        layer:layer
    }
})(ol);
if (typeof require != 'undefined'){
    module.exports = modulo_layer;
}