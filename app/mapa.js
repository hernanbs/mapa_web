

$(document).ready(function(){
//-----------VARIAVEIS
    var LATLONG_DF = "lat -15° 46' 47'' ,  long -47° 55' 47''"
    var latlong = ""
    var formato_MousePosition = "LONG {x} , LAT {y}"
   
//-----------URLs
    var url_fundo = "https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer";
    //var url_limites_cidades = "http://mapasinterativos.ibge.gov.br/arcgis/rest/services/LIMITES/MapServer";
    var url_limites_cidades = "http://mapasinterativos.ibge.gov.br/arcgis/rest/services/RECORTES/MapServer";
    var url_capital = "http://mapasinterativos.ibge.gov.br/arcgis/rest/services/LOCALIDADES/MapServer";
    var url_biomas = "http://mapasinterativos.ibge.gov.br/arcgis/rest/services/BIOMA/MapServer";
    var url_clima = "http://mapasinterativos.ibge.gov.br/arcgis/rest/services/CLIMAS/MapServer";
    
//-----------
//source de camadas
    var cidades = new ol.source.TileArcGISRest({
        url: url_limites_cidades,
        params: {'LAYERS':"show:0,1"},
        ratio:1
    });
    var capital = new ol.source.TileArcGISRest({
        url: url_capital,
        params: {'LAYERS':"show:0"},
        ratio:1
    });
//camadas
    var l_cidades = new ol.layer.Tile({
        source: cidades

    });
    var l_capital = new ol.layer.Tile({
        source: capital,

    });
//features

//Vector


//colocar poligonos desenhados
//var drawBox = 
//var drawMultiplo = 
//var drawAbstrato = 'Polygon'

var conf_draw = {
    box: ['Circle',ol.interaction.Draw.createBox()],
    abstrato:['Polygon',undefined],
    multiplo:['Circle',ol.interaction.Draw.createRegularPolygon(6)]
}
var arrayDraw = conf_draw.abstrato

var colecao_teste = new ol.Collection();

var sr_vetor = new ol.source.Vector({
    features: colecao_teste
});
var vetor_teste = new ol.layer.Vector({
    source: sr_vetor
  });

var drawBOX = new ol.interaction.Draw({
    source: sr_vetor,
    type: conf_draw.box[0],
    geometryFunction: conf_draw.box[1]
});
var drawABSTRATO = new ol.interaction.Draw({
    source: sr_vetor,
    type: conf_draw.abstrato[0],
    geometryFunction: conf_draw.abstrato[1]
});
var drawMULTIPLO = new ol.interaction.Draw({
    source: sr_vetor,
    type: conf_draw.multiplo[0],
    geometryFunction: conf_draw.multiplo[1]
});
var draw = new ol.interaction.Draw({
    source: sr_vetor,
    type: arrayDraw[0],
    geometryFunction: arrayDraw[1]
});
//source do fundo 
    var sr_arcgis = new ol.source.TileArcGISRest({
        ratio: 1,
        params: {},
        url: url_fundo
    });

    var sr_osm = new ol.source.OSM();

    var sr_starmen = new ol.source.Stamen({layer: 'toner'});

//imagem de fundo
    var mapa_fundo = new ol.layer.Tile({
        source: sr_arcgis,
        visible:true
    });
//controles
var controle = new ol.control.MousePosition({
            projection:"EPSG:4326",
            target:"posicaoMouse"
        });




    

//mapa total
    var mapTotal = new ol.Map({
        controls: ol.control.defaults().extend([
            controle,//mudar controles
            new ol.control.Rotate(),
            //new ol.control.ScaleLine(),
            new ol.control.ZoomSlider()
        ]),
        layers:[mapa_fundo,l_cidades,l_capital,vetor_teste],
        target:'map',
        view: new ol.View({//4326
            projection:"EPSG:4326",
            center:[-47.9292,-15.7801] ,
            zoom:4
        })
    });
//Execuçoes****************************************************************************************************************
//var latlong = map.



 $("#txtZoom").text("Zoom: "+ mapTotal.getView().getZoom());

 mapTotal.getView().on('change:resolution', function(e) {
    $("#txtZoom").text("Zoom: "+ Math.round(mapTotal.getView().getZoom()));
  });

 $('#map').on("mousemove",function(event){//tem q estar em outra funcao formatadora
    //$("#txtZoom").text("Zoom: "+ mapTotal.getView().getZoom());
    if(!$("#posicaoMouse div").text() == "" ){
        let aux = $("#posicaoMouse div").text()
        aux = aux.split(",")
        latlong = [parseFloat(aux[0]),parseFloat(aux[1])]
    }
    //$("#controlMouse").text(ol.coordinate.format(latlong,formato_MousePosition,4))
    $("#controlMouse").text(formatGrauMinSeg(ol.coordinate.toStringHDMS(latlong, 1)));
 });

 
 $("#btn-desenhar").on("click",function(event){
    mapTotal.addInteraction(draw);
    if ( $("#context div").length ){
        $("#context div").remove();
        $("#context").hide("slow");
        mapTotal.removeInteraction(draw);
    }else{
        $("#context").html( $("#listaDesenho").clone());
        $("#context div").removeAttr("hidden");
        $("#context").show("slow");
        $("#context #listaDesenho .nav-box").on("click",function(event){
            mapTotal.removeInteraction(draw);   //retirando a ultima escolha 
            draw = undefined;                   //retirando a ultima escolha 
            draw = drawBOX;                     //mudando valor a ser adicionado
            mapTotal.addInteraction(draw);      //adicionando realmente
           
            console.log("444");      
        });
        $("#context #listaDesenho .nav-abstrato").on("click",function(event){
            mapTotal.removeInteraction(draw);
            draw = undefined;
            draw = drawABSTRATO;
            mapTotal.addInteraction(draw);
            console.log("999");
        });
        
        $("#context #listaDesenho .nav-multiplo").on("click",function(event){
            mapTotal.removeInteraction(draw);
            draw = undefined;
            draw = drawMULTIPLO;
            mapTotal.addInteraction(draw);
            console.log("777"); 
        });//ver ol.interaction.Draw para descobrir solucao melhor

        $("#context #listaDesenho .nav-nenhum").on("click",function(event){         
            console.log("555");
            mapTotal.removeInteraction(draw);
        });
    }
    
 });


 $("#btn-mapas").on("click",function(event){
    if ( $("#context div").length ){
        $("#context div").remove();
        $("#context").hide("slow");
    }else{
        $("#context").html( $("#listaMapa").clone());
        $("#context div").removeAttr("hidden");
        $("#context").show("slow");

        $("#context #listaMapa .osm").on("click",function(event){
            console.log("777");
            mapa_fundo.setSource(sr_osm);
        });
        $("#context #listaMapa .mapafundo").on("click",function(event){
            console.log("777");
            mapa_fundo.setSource(sr_arcgis);
        });
        
        $("#context #listaMapa .starmen").on("click",function(event){
            console.log("777");
            mapa_fundo.setSource(sr_starmen);
        });
    }
 });



//****************************************************************************************************** 
//funcoes 


function  formatGrauMinSeg(format_coordinate_GrauMinSeg){
    var aux = format_coordinate_GrauMinSeg.search("N")
    if (aux == -1){
        aux = format_coordinate_GrauMinSeg.search("S")
    }
    aux = aux+1
    return "LAT " + format_coordinate_GrauMinSeg.substring(0,aux) + " , LONG " + format_coordinate_GrauMinSeg.substring(aux)
}







////
//box = ol.interaction.Draw.createBox();
//mapTotal.addInteraction();


// TODO: block
//  colocar a opcao de  desenhar poligonos
// existe um jeito de deixar esferico
//criar uma lupa(magnity)
//Icon Pixel Operations
//procurar como mudar cor de mapa

})
