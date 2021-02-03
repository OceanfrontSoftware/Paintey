<template>
    <div>
        <b-modal ref="share-modal" id="share-modal" title="Share!">
            <b-img ref="preview" id="download-preview" fluid :src="this.imageUrl" alt="Painting preview" />
            <b-button :href="this.imageUrl" download='paintey.png'>Download</b-button>
            <b-button class="fb-share-button" :data-href="'https://paintey.com/paintings/' + this.imageId" data-layout="button" data-size="small">
                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpaintey.com%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore share-button">Share on Facebook</a>
            </b-button>
        </b-modal>
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
            //this.$refs['share-modal'].show();

            // save image and get URL
            axios.post("/image/", {img: this.imageUrl})
            .then(function(response){
                var id = response.data.id;
                this.imageId = id;
                console.log(`id: ${id}`);
                window.location.href = '/paintings/' + id;

                //TODO: open the /paintings/:id in new tab - need to share from that page
                //ALSO: need to update paintings once saved instead of creating new id    
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



