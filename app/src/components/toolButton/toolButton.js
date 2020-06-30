import BaseMap from '../tools/Basemap/Basemap'
import DrawGeo from '../tools/DrawGeo/DrawGeo'
import Login from '../tools/Login/Login'
import Layer from '../tools/Layer/Layer'

export const tools = {
  BaseMap: {
    type: BaseMap,
    help: 'Alterar o mapa de fundo',
    icon: 'map'
  },
  DrawGeo: {
    type: DrawGeo,
    help: 'Desenhar poligonos no mapa',
    icon: 'edit_location'
  },
  Login: {
    type: Login,
    help: 'Realizar Login',
    icon: 'person'
  },
  Layer: {
    type: Layer,
    help: 'Camadas disponíveis',
    icon: 'layers'
  }
}
export const components = () => {
  var ret = {}
  for (var i in tools) {
    ret[i] = tools[i].type
  }
  return ret
}
