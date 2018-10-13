import * as mutatitonType from './mutationType'

export default{
  [mutatitonType.CHANGE_MAP] (state, newMap) {
    state.map = newMap
  },
  /* descrição do commit ==>commit('evento_changeMap',novo_estado)
  *  ['evento_changeMap'](estado,novo_estado){
  *
  *  }
  */
  [mutatitonType.CHANGE_BASEMAP] (state, newLayer) {
    state.basemap = newLayer
  }
}
