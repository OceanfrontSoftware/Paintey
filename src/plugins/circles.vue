<template>
    <span/>
</template>
<script>

export default {
    // store data for the toolbar here
    computed:{
        size(){
            var _size = this.getControlValue('size-range');
            var anchor = this.getControlValue('size-anchor');

            if(anchor.length !== 0)
            {
                switch(anchor){
                    case "top":
                        return  this.options.y;
                    case "center":
                        return Math.abs(this.canvas.height / 2 - this.options.y);
                    case "bottom":
                        return this.canvas.height - this.options.y;
                    case "left":
                        return this.options.x;
                    case "middle":
                        return Math.abs(this.canvas.width / 2 - this.options.x);
                    case "right":
                        return this.canvas.width - this.options.x;
                    default: 
                        return _size;
                }    
            }

            return _size;


            
        }
    },
    data() {
        return {
            canvas: null,
            ctx: null,
            counterSize: 0,
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
                    name: "Color",
                    controls: [
                        {
                            id: 'color-picker',
                            component: "colorPicker", 
                            title: "Color", 
                            description: "Color",
                            value: "#000"
                        }
                    ]
                },{
                    name: "Opacity",
                    controls: [
                        {
                            id: 'opacity',
                            component: "numberRange", 
                            title: "Opacity", 
                            description: "See through",
                            min: 1,
                            max: 100,
                            step: 1,
                            value: 5
                        }
                    ]
                },
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
                            step: 1,
                            value: 50
                        }
                    ]
                },
                {
                    name: "Anchor",
                    controls: [
                        {
                            id: 'size-anchor',
                            component: 'dropdown',
                            title: "Anchor",
                            description: "Anchor size to zero",
                            value: "",
                            values: [{text: "", value: ""}, {text: "top", value: "top"}, {text: "center", value: "center"},{text: "bottom", value: "bottom"},{text: "left", value: "left"},{text: "middle", value: "middle"},{text: "right", value: "right"}]
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
            window.addEventListener('mouseup', this.mouseUp);

            this.canvas.addEventListener('touchstart', this.mouseDown);
            this.canvas.addEventListener('touchmove', this.mouseMove);
            window.addEventListener('touchend', this.mouseUp);


        },
        draw(){
            this.ctx.beginPath();
            this.ctx.globalAlpha = this.getControlValue("opacity") / 100;
            this.ctx.strokeStyle = this.getControlValue('color-picker');
            this.ctx.arc(this.options.x, this.options.y, this.size, 0, 2 * Math.PI);
            this.ctx.stroke();
        },
        getControlValue(id){
            var matches = this.tools.map(t=> t.controls.filter(c=> c.id === id));
            for(var i = 0; i<matches.length; i++){
                var control = matches[i][0];
                if(control && control != [])
                    return control.value;
            }
        },
        mouseDown(e){
            e.preventDefault();
            this.options.x = e.targetTouches ? e.targetTouches[0].pageX : e.offsetX;
            this.options.y = e.targetTouches ? e.targetTouches[0].pageY : e.offsetY;
            this.options.isDrawing = true;
        },
        mouseMove(e){
            e.preventDefault();
            if(this.options.isDrawing){
                this.options.x = e.targetTouches ? e.targetTouches[0].pageX : e.offsetX;
                this.options.y = e.targetTouches ? e.targetTouches[0].pageY : e.offsetY;
                this.draw();
            }
        },
        mouseUp(){
            this.options.isDrawing = false;
            this.counterSize = 0;
        },
        setControlValue(id, value){
            var matches = this.tools.map(t=> t.controls.filter(c=> c.id === id));
            for(var i = 0; i<matches.length; i++){
                var control = matches[i][0];
                if(control && control != [])
                    control.value = value;
            }
        },
        settingChanged(value, id){
            console.log(`id: ${id}, value: ${value}`)
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

    // trigger DrawCompleted event with complete drawing record (a typed object would be nice here)

    // trigger ArchiveLayer to save layer in history 

}
</script>