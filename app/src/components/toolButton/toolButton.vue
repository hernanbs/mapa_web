<template>
  <div>
    <div class="btn-group grouptools" role="group">
      <div v-for="(item, index) in tools" :key="index"
        :title="item.help"
        @click="onClickTool(index)"
        class="btn btn-outline-success btntools">
        <i class="material-icons">{{item.icon}}</i>
      </div>
    </div>
    <div v-if="toolOpen !== null" class="tool">
      <div  v-for="(item, index) in tools" :key="index">
        <component v-show="toolOpen == index" :ref="index" :is="item.type"/>
      </div>
    </div>
  </div>
</template>
<script>

import { components, tools } from './toolButton'

export default {
  name: 'toolbutton',
  // props: ['map'],
  data: () => ({
    tools: tools,
    toolOpen: null,
    toolOpenContent: undefined
  }),
  component: {
    ...components()
  },
  methods: {
    onClickTool (index) {
      if (this.toolOpen !== index) {
        this.toolOpen = index
      } else {
        this.toolOpen = null
      }
    }
  }
}
</script>
<style lang="stylus" >

div.grouptools
  position absolute
  top 5px
  right 5px
  z-index 1
div.btntools
  background white

div.tool
  background #ffffffbf
  max-width 65vw
  min-width 35vw
  position absolute
  top 5px
  right 5px
  padding-top 7vw
  padding-bottom 3vh
  max-height 70vh
  overflow auto
  border-top-left-radius 30px
  padding-right 3vw
  padding-left 1vw

</style>
