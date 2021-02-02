<template>
    <canvas id="image-canvas" ref="imagecanvas" v-bind:width="width" v-bind:height="height">
    </canvas>
</template>

<script>

export default {
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    computed: {
        canvas: function () {
            return this.$refs.imagecanvas;
        },
        ctx: function () {
            return this.canvas.getContext('2d');
        }
    },
    data() {
        return {
            height: 5,
            width: 5,
            top: 0,
            margin: 0,
        };
    },
  
    methods: {
        handleResize() {
            // Calculate new canvas size based on window
            var navHeight = document.getElementById('nav-bar').clientHeight;
            var toolbarWidth = document.getElementById('toolbar').clientWidth;
            this.height = window.innerHeight - this.margin - navHeight;
            this.width = window.innerWidth - this.margin - toolbarWidth;
            this.top = navHeight;
        },
        startNewPainting(){
            if(!confirm("Are you sure you want to clear the canvas?"))
                return;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },

    mounted(){
        window.addEventListener('resize', this.handleResize);
        
        this.$root.$off("StartNewPainting");
        this.$root.$on("StartNewPainting", this.startNewPainting);
        
        this.$root.$off('LayoutChanged');
        this.$root.$on('LayoutChanged', this.handleResize);
        
        this.handleResize();
        this.$nextTick(() => {
            // color background white
            this.ctx.beginPath();
            this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "#fff";
            this.ctx.fill();

            this.$root.$emit('CanvasReady', this.canvas, this.ctx);
        })
    }
    
};

</script>

<style scoped>
#image-canvas {
    position: absolute;
    top: 56px;
    
}
</style>