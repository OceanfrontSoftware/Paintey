<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>Feed</h1>
                <b-container fluid>
                    <b-row>
                        <b-col cols="3" v-for="painting in this.paintings" :key="painting._id">
                            <router-link :to='"/paintings/" + painting._id'>
                                <b-img-lazy thumbnail fluid :src="'https://image.paintey.com/' + painting._id + '.thumb.jpg'" />
                                <p>{{formatDateTime(painting.ts)}}</p>
                            </router-link>
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';
export default {
    name: 'App',
    data() {
        return {
            paintings: []
        }
    },
    components: {
        
    },
    methods: {
        
        formatDateTime(ts){
            var d = new Date(ts);
            return (d.getUTCMonth()+1) +"/"+ d.getUTCDate() +  "/" + d.getUTCFullYear() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
        }
    },
    mounted(){

        // within the axios response 'this' refers to axios not the component
        var _component = this;

        // get data and show in page
        axios.get("/image/", {})
        .then(function(response){
            //console.log(JSON.stringify(response.data, null, 2));
            _component.paintings = response.data;
        })
        .catch(function(err){
            console.log('axios error getting images from /image/: ' + err.message);
        })
    }
}
</script>
