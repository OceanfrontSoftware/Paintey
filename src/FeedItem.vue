<template>
    <b-container>
        <b-row>
            <b-col>
                
                <b-img-lazy thumbnail fluid :src="'https://image.paintey.com/' + painting._id + '.jpg'" />
                <p>{{formatDateTime(painting.ts)}}</p>
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
            painting : {}
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
        var id = this.$route.params.id;
        var url = `/image/${id}`;
        console.log(url);

        //_component.painting = { "_id": "6014dfa38803ea21fd75c8ae", "ts": "2021-01-30T04:25:07.534Z" }

        // get data and show in page
        axios.get(url, {})
        .then(function(response){
            console.log(JSON.stringify(response.data, null, 2));
            _component.painting = response.data;
        })
        .catch(function(err){
            console.log('axios error getting images from /image/: ' + err.message);
        })
    }
}
</script>
