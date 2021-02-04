<template>
    <b-container>
        <b-row>
            <b-col>
                <b-img-lazy thumbnail fluid :src="'https://image.paintey.com/' + painting._id + '.jpg'" />
                <p>{{formatDateTime(painting.ts)}}</p>
                <b-button :href="this.imageUrl" download='paintey.png'>Download</b-button>
                <b-button class="fb-share-button" :data-href="'https://paintey.com/painting/' + this.imageId" data-layout="button" data-size="small">
                    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpaintey.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore share-button">Share on Facebook</a>
                </b-button>
            </b-col>
        </b-row>
        <!-- For now this page is not in use, am pre-rendering on server, but will likely use SSR in future so this page will come back -->        
        <!-- for now see /routes/views -->
        
        <div id="fb-root"></div>
    </b-container>
</template>

<script>
import axios from 'axios';
export default {
    name: 'App',
    data() {
        return {
            painting : {},
            imageId: '',
            imageUrl: ''
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
        this.imageId = this.$route.params.id;
        this.imageUrl = 'https://image.paintey.com/' + this.imageId + '.jpg';

        //_component.painting = { "_id": "6014dfa38803ea21fd75c8ae", "ts": "2021-01-30T04:25:07.534Z" }

        let fbScript = document.createElement('script');
        fbScript.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0');
        fbScript.setAttribute('crossorigin', 'anonymous');
        fbScript.setAttribute('nonce', 'iWhp15VP');
        document.body.appendChild(fbScript);

        // get data and show in page
        axios.get(`/image/${this.imageId}`, {})
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

<style scoped>
  #download-preview {border: 1px solid #ccc;}
  .share-button {color: #fff;}
</style>