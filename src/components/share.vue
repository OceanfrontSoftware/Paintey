<template>
    <b-modal ref="share-modal" id="share-modal" title="Share!">
        <b-img ref="preview" id="download-preview" fluid :src="this.imageUrl" alt="Painting preview" />
        <b-button :href="this.imageUrl" download='paintey.png'>Download</b-button>
    </b-modal>
</template>



<script>
  export default {
    data() {
      return {
        imageUrl: ''
      }
    },
    methods: {
      download(){

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
      this.$root.$on('showShareModal', this.showModal);
    }
  }
</script>


<style scoped>
  #download-preview {border: 1px solid #ccc;}
</style>