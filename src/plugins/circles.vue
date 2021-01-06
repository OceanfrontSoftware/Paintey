<template>
    <span/>
</template>
<script>

export default {
    // store data for the toolbar here
    data() {
        return {
            canvas: null,
            ctx: null,
            options: {
                isDrawing: false,
                fillStyle : "fill",
                color: "random",
                colorValue: "#000",
                size: 20,
                x: 0,
                y: 0,
                x2: 0,
                y2: 0,
                context: null
            },
            tools: [
                {
                    name: "Size",
                    controls: [
                        {
                            component: "numberRange", 
                            title: "Size", 
                            description: "The size of the circle",
                            min: 1,
                            max: 20
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        handleClick(){
            console.log('clicked');
        }
    },
    mounted: function(){
        // add the plugin tools to the tray
        this.$store.commit('SetTools', this.tools);

         
        this.$root.$on('CanvasReady', (canvas, ctx)=>{
            this.canvas = canvas;
            this.ctx = ctx;
            
            this.canvas.addEventListener('mousedown', ()=>{
                this.ctx.beginPath();
                this.ctx.arc(100, 75, 50, 0, 2 * Math.PI);
                this.ctx.stroke();
            })
        });
        
        
        
    },
    props: []
    
    

    // props for canvas and context objects

    // trigger DrawCompleted event with complete drawing record (a typed object would be nice here)

    // trigger ArchiveLayer to save layer in history 

}
</script>