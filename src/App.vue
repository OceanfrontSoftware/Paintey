<template>
  <div id="app">
    <Canvas />
    <Navigation />
    <Toolbar />
  </div>
</template>

<script>
import Canvas from './components/canvas.vue'
import Navigation from './components/navigation.vue'
import Toolbar from './components/toolbar.vue'


export default {
  name: 'App',
  components: {
    Navigation,
    Canvas,
    Toolbar
  }
}
</script>

