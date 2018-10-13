import * as mutationType from './mutationType'

// Equivalente a methods
// Pode ser assíncrono

// Função semelhante a um set Map
export function changeMap ({commit}, newMap) {
  commit(mutationType.CHANGE_MAP, newMap)
}
