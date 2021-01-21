// store/index.js
 
import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
        colors: [],
        tools: []
    },
    getters: {},
    mutations: {
        // used by plugins to load colors into the color tray
        SetColors(state, colors){
            Vue.set(state, 'colors', colors);
        },
        // used by plugins to load tools into the tool tray
        SetTools(state, tools){
            Vue.set(state, 'tools', tools);
        }
    },
    actions: {}
});