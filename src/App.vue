<template>
  <div id="app">
    <div id="nav">
        <h4><a href="/">Paint</a></h4>
        <h4><router-link to="/share">Share</router-link></h4>
        <h4><router-link to="/about">About</router-link></h4>
    </div>
    <router-view></router-view>
    
  </div>
  
</template>

<script>


export default {
    name: 'App',
    components: {
      
    },
    methods: {

    },
    mounted(){
        let ga = document.createElement('script');
        ga.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-ZTM0HCRQTD');
        document.body.appendChild(ga);

        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-ZTM0HCRQTD');
    
    }
}
</script>

<style scoped>
    #nav {
        background-color:tomato;
        padding: 10px;
    }
    #nav h4 {
        display: inline; 
        margin-right: 10px;
        font-size: 1.4em;
    }
    #nav a{
        color: #fff;
        
    }
</style>