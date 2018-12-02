
import config from './../../../config'
/*
* Lista de camadas.
*/
export const layerList = [
  {
    text: 'Pais',
    url: config.url.ibge + 'CCAR/wms?',
    params: {'LAYERS': 'CCAR:BC250_Pais_A', 'TILED': true},
    defaultVisible: true
  },
  {
    text: 'limite_estadual_2010',
    url: config.url.ibge + 'CGEO/wms?',
    params: {'LAYERS': 'CGEO:C02_limite_estadual_2010', 'TILED': true},
    defaultVisible: true
  },
  {
    text: 'BC250_Municipio_A',
    url: config.url.ibge + 'CCAR/wms?',
    params: {'LAYERS': 'CCAR:BC250_Municipio_A', 'TILED': true},
    defaultVisible: false
  }
]
