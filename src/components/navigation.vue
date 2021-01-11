<template>
  <div>
    <b-navbar id="nav-bar" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Paintey</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-on:click="newPainting()">New</b-nav-item>
                <b-nav-item >Plugins</b-nav-item>
                <b-nav-item v-on:click="sharePainting()">Share</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <Share></Share>
  </div>
</template>

<script>
  import Share from './share.vue'
  export default {
    components: {
      Share
    },
    methods: {
      newPainting(){
        this.$root.$emit("StartNewPainting");
      },
      sharePainting(){
        this.$root.$emit('showShareModal')
      }
    },
    mounted(){
      
    }
  }
</script>
