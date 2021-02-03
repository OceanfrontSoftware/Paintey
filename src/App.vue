<template>
  <div id="app">
    <b-navbar id="nav-bar" toggleable="lg" type="dark" variant="info">
        <router-link to="/">
            <span class='navbar-brand'>Paintey</span>
        </router-link>
        
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <li class="nav-item">
                    <router-link to="/paintings" class="nav-link">Paintings</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link">About</router-link>
                </li>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
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

