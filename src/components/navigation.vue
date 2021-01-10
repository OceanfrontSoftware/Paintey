<template>
    <b-navbar id="nav-bar" toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Paintey</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-on:click="newPainting()">New</b-nav-item>
                <b-nav-item >Plugins</b-nav-item>
                <b-nav-item >Share</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
  export default {
    computed: {

    },
    data() {
      return {
        
      }
    },
    methods: {
      newPainting(){
        this.$root.$emit("StartNewPainting");
      }
    },
    mounted(){
      
    }
  }
</script>