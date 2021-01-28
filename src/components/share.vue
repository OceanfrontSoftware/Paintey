<template>
    <b-modal ref="share-modal" id="share-modal" title="Share!">
        <b-img ref="preview" id="download-preview" fluid :src="this.imageUrl" alt="Painting preview" />
        <b-button :href="this.imageUrl" download='paintey.png'>Download</b-button>
        <b-button @click="shareOnFB">Share on Facebook</b-button>
    </b-modal>
</template>



<script>
import axios from 'axios';
export default 
{
    

    data() {
        return {
            imageUrl: ''
        }
    },
    methods: {
        download(){

        },
        shareOnFB(){
            // save image and get URL
            axios.post("/image/", {img: this.imageUrl})
            .then(function(response){
                var id = response.data.id;
                console.log(`id: ${id}`)
                // redirect to fb
            })
            .catch(function(err){
                console.log('axios error posting to /images: ' + err.message);
            })
        },
        showModal(){
            var c = document.getElementById('image-canvas');
            var src = "";
            if(c)
                src = c.toDataURL();
            this.imageUrl = src;
            this.$refs['share-modal'].show();
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
</style>