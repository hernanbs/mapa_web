import * as mutationType from './mutationType'

// Equivalente a methods
// Pode ser assíncrono

// Função semelhante a um set Map
export function changeMap ({commit}, newMap) {
  commit(mutationType.CHANGE_MAP, newMap)
}
export function changeBaseMap ({commit}, newLayer) {
  commit(mutationType.CHANGE_BASEMAP, newLayer)
}
