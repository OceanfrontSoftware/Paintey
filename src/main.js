import Vue from 'vue'
import VueRouter from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import Feed from './Feed.vue'
//import FeedItem from './FeedItem.vue'
import Painting from './Painting.vue'
import About from './About.vue'
import store from "./store";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const routes = [
  {
    path: '/',
    component: Painting,
    meta: {
      title: 'Paintey - sharable online canvas',
      metaTags: [
        {
          name: 'description',
          content: 'Paint and share online with Paintey!'
        },
        {
          property: 'og:description',
          content: 'Paint and share online with Paintey!'
        }
      ]
    }
  },
  
  {
    path: '/about',
    component: About,
    meta: {
      title: 'About Us - Paintey',
      metaTags: [
        {
          name: 'description',
          content: 'About Paintey'
        },
        {
          property: 'og:description',
          content: 'About Paintey'
        }
      ]
    }
  },
  {
    path: '/share',
    component: Feed,
    meta: {
      title: 'Paintings - Paintey',
      metaTags: [
        {
          name: 'description',
          content: 'Make a new painting online with Paintey'
        },
        {
          property: 'og:description',
          content: 'Paint with Paintey'
        },
        {
          property: 'og:title',
          content: 'Paintey - '
        }
      ]
    }
  }/*,
  {
    path: '/paintings/:id',
    component: FeedItem,
    meta: {
      title: 'Painting - Paintey',
      metaTags: [
        {
          name: 'description',
          content: 'Make a new painting online with Paintey'
        },
        {
          property: 'og:url',
          content: 'https://paintey.com/paintings/:id'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:title',
          content: 'My painting on Paintey'
        },
        {
          property: 'og:description',
          content: 'Paint and share online with Paintey!'
        },
        {
          property: 'og:image',
          content: 'https://image.paintey.com/:id.thumb.jpg'
        }
        
      ]
    }
  }*/
];

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Start the router
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history'
});

// This callback runs before every route change, including on page load.

router.beforeEach((to, from, next) => {
  /*console.log(`to: `);
  for(var p in to){
    console.log(`to.${p}: ${to[p]}`);
  }*/
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  //const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    // set the meta tag key / value - substitute :id in the value if present
    Object.keys(tagDef).forEach(key => {
      var value = tagDef[key];
      if(value.indexOf(":id") > -1)
      {
        var pathParts = to.path.split('/');
        if(pathParts.length > 1){
          var id = pathParts[pathParts.length - 1];
          if(!id || id==null || id.length == 0)
            id = "";
          
          console.log(`id: ${id}`);
          value = value.replace(":id", id);
        }
        
      }
      tag.setAttribute(key, value);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
