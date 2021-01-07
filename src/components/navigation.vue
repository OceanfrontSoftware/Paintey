<template>
    <b-navbar id="nav-bar" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Paintey</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">New</b-nav-item>
                <b-nav-item href="#">Plugins</b-nav-item>
                <b-nav-item download :href="this.href">Share</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
  export default {
    computed: {
      href(){
        if(!this.canvas)
          return "";
        var imageData = this.canvas.toDataURL();
        var newData = imageData.replace("image/png", "image/octet-stream");
        return newData;
      }
    },
    data() {
      return {
        canvas: null,
        ctx: null
      }
    },
    methods: {
      canvasReady(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
      },
      download(){
        

      }
    },
    mounted(){
      // set the canvas and context objects when the canvas is ready
        this.$root.$on('CanvasReady', this.canvasReady);
    }
  }
</script>