<template>
    <span/>
</template>
<script>

export default {
    // store data for the toolbar here
    computed:{
        size(){
            return this.getControlValue('size-range');
        }
    },
    data() {
        return {
            canvas: null,
            ctx: null,
            options: {
                isDrawing: false,
                fillStyle : "fill",
                color: "random",
                colorValue: "#000",
                size: this.size,
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
                            id: 'size-range',
                            component: "numberRange", 
                            title: "Size", 
                            description: "The size of the circle",
                            min: 1,
                            max: 200,
                            value: 20
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        canvasReady(canvas, ctx){
            this.canvas = canvas;
            this.ctx = ctx;
            this.canvas.addEventListener('mousedown', this.mouseDown);
            this.canvas.addEventListener('mousemove', this.mouseMove);
            this.canvas.addEventListener('mouseup', this.mouseUp);
        },
        draw(){
            this.ctx.beginPath();
            this.ctx.arc(this.options.x, this.options.y, this.size, 0, 2 * Math.PI);
            this.ctx.stroke();
        },
        getControlValue(id){
            var match = this.tools.map(t=> t.controls.filter(c=> c.id === id));
            var control = match[0][0];
            return control.value;
        },
        mouseDown(e){
            this.options.x = e.offsetX;
            this.options.y = e.offsetY;
            this.options.isDrawing = true;
        },
        mouseMove(e){
            if(this.options.isDrawing){
                this.draw();
                this.options.x = e.offsetX;
                this.options.y = e.offsetY;
            }
        },
        mouseUp(){
            this.options.isDrawing = false;
        },
        setControlValue(id, value){
            var match = this.tools.map(t=> t.controls.filter(c=> c.id === id));
            var control = match[0][0];
            control.value = value;
        },
        settingChanged(value, id){
            this.setControlValue(id, value);
        }
    },
    mounted: function(){
        // add the plugin tools to the tray
        this.$store.commit('SetTools', this.tools);
        
        // get alerted when a toolbar item is used to change a setting
        this.$root.$on('SettingChanged', this.settingChanged);
       
        // set the canvas and context objects when the canvas is ready
        this.$root.$on('CanvasReady', this.canvasReady);
        
        
        
    },
    props: []
    
    

    // props for canvas and context objects

    // trigger DrawCompleted event with complete drawing record (a typed object would be nice here)

    // trigger ArchiveLayer to save layer in history 

}
</script>