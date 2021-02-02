<template>
    <div>
        <b-modal ref="share-modal" id="share-modal" title="Share!">
            <b-img ref="preview" id="download-preview" fluid :src="this.imageUrl" alt="Painting preview" />
            <b-button :href="this.imageUrl" download='paintey.png'>Download</b-button>
            <b-button class="fb-share-button" :data-href="'https://paintey.com/paintings/' + this.imageId" data-layout="button" data-size="small">
                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpaintey.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore share-button">Share on Facebook</a>
            </b-button>
        </b-modal>
        <!-- Load Facebook SDK for JavaScript -->
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0" nonce="iWhp15VP"></script>
        <div id="fb-root"></div>
    </div>
</template>



<script>
import axios from 'axios';
export default 
{
    

    data() {
        return {
            imageUrl: '',
            imageId: null
        }
    },
    methods: {
        download(){

        },
        shareOnFB(){
            
        },
        showModal(){
            var c = document.getElementById('image-canvas');
            var src = "";
            if(c)
                src = c.toDataURL();
            this.imageUrl = src;
            this.$refs['share-modal'].show();

            // save image and get URL
            axios.post("/image/", {img: this.imageUrl})
            .then(function(response){
                var id = response.data.id;
                this.imageId = id;
                console.log(`id: ${id}`);
            })
            .catch(function(err){
                console.log('axios error posting to /images: ' + err.message);
            })
        }
    },
    mounted(){
        this.$root.$off('showShareModal');
        this.$root.$on('showShareModal', this.showModal);
    }
}
</script>



<style scoped>
  #download-preview {border: 1px solid #ccc;}
  .share-button {color: #fff;}
</style>