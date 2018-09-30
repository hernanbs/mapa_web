<template>
  <div>
    <h4>Mapas de fundo disponíveis</h4>
    <hr noshade/>
    <div @click="clicando()" class="btn btn-outline-success">Basemap</div>
    <div class="btn btn-outline-success">Basemap</div>
  </div>
</template>
<script>

export default {
  name: 'basemap',
  data: () => ({
    
  }),
  methods:{
    clicando(){
      console.log(this)
    }
  }

}
</script>
<style lang="">
  
</style>