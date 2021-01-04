<template>
    <canvas id="image-canvas" ref="imagecanvas" v-bind:width="width" v-bind:height="height">
    </canvas>
</template>

<script>
export default {
    data() {
        return {
            height: 5,
            width: 5,
            top: 0,
            margin: 0,
        };
    },
    mounted(){
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    computed: {
        canvas: function () {
            return this.$refs.imagecanvas;
        },
        ctx: function () {
            return this.canvas.getContext('2d');
        }
    },
    methods: {
        handleResize: function () {
            // Calculate new canvas size based on window
            var navHeight = document.getElementById('nav-bar').clientHeight;
            var toolbarHeight = document.getElementById('toolbar').clientHeight;
            this.height = window.innerHeight - this.margin - navHeight - toolbarHeight;
            this.width = window.innerWidth - this.margin;
            this.top = navHeight;
            this.$nextTick(() => {
                this.drawText();
            })
        },
        drawText: function () {
            // Redraw & reposition content
            var resizeText = 'Canvas width: ' + this.canvas.width + 'px';

            
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = '#fff';
            this.ctx.fillText(resizeText, 200, 200);
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    }
};

</script>

<style scoped>
#image-canvas {
    position: absolute;
    top: 56px;
    background-color:#ccc;
    
}
</style>