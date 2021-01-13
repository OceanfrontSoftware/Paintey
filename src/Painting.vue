<template>
  <div id="painting">
    <Canvas />
    <Toolbar />
    <Circles/>
  </div>
</template>

<script>
import Canvas from './components/canvas.vue'
import Circles from './plugins/circles.vue'
import Toolbar from './components/toolbar.vue'


export default {
  name: 'Painting',
  components: {
    Circles,
    Canvas,
    Toolbar
  }
}
</script>

<style scoped>
* {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>