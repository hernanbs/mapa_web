<template>
  <div>
    <h4>Mapas de fundo disponíveis</h4>
    <hr noshade/>
    <div @click="clicando()" class="btn btn-outline-success">Basemap</div>
    <div class="btn btn-outline-success">Basemap</div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'
import configuration from './../../../config'

export default {
  name: 'basemap',
  data: () => ({
  }),
  computed: {
    ...mapState(['map'])
  },
  methods: {
    clicando () {
      console.log(this)
      console.log(this.map)
    },
    ...mapActions(['changeMap'])
  }
}
</script>
<style lang="stylus">
</style>
