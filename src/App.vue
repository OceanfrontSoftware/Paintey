<template>
  <div id="app">
    <b-navbar id="nav-bar" toggleable="lg" type="dark" variant="info">
        <router-link v-on:click="newPainting()" to="/">
            <span class='navbar-brand'>Paintey</span>
        </router-link>
        
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <li class="nav-item">
                    <router-link to="/paint">New</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about">About</router-link>
                </li>
                <b-nav-item >Plugins</b-nav-item>
                <b-nav-item v-on:click="sharePainting()">Share</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <Share></Share>
    <router-view></router-view>
  </div>
</template>

<script>
import Share from './components/share.vue'

export default {
    name: 'App',
    components: {
        Share
    },
    methods: {
        newPainting(){
            console.log('new painting');
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
