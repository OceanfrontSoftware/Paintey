<template>
    <span/>
</template>
<script>

export default {
    // store data for the toolbar here
    computed:{
        color(){
            return this.getSelectedColorControl();
            
            
        },
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
            colors: [
                {
                    name: "Single Color",
                    controls: [
                        {
                            id: 'color-picker',
                            component: "colorPicker", 
                            title: "Single Color", 
                            description: "Pick a color",
                            value: "#000",
                            group: 'colors',
                            on: false
                        }
                    ]
                },
                {
                    name: "Random Color",
                    controls: [
                        {
                            id: 'random-color',
                            component: "randomColor", 
                            title: "Random Color", 
                            description: "Generate random colors",
                            value: "#000",
                            group: 'colors',
                            on: true
                        }
                    ]
                }
            ],
            tools: [
                {
                    name: "Style",
                    controls: [
                        {
                            id: 'style',
                            component: 'dropdown',
                            title: "Style",
                            description: 'If the circle should be filled in or just the outline',
                            value: "Fill",
                            values: [{text: "Fill", value: "Fill"}, {text: "Outline", value: "Stroke"}]
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
                            title: "Stick To",
                            description: "Make the circle stick to a line and grow in size from there",
                            value: "",
                            values: [{text: "Not Stuck", value: ""}, {text: "top", value: "top"}, {text: "center", value: "center"},{text: "bottom", value: "bottom"},{text: "left", value: "left"},{text: "middle", value: "middle"},{text: "right", value: "right"}]
                        }
                    ]
                },
                {
                    name: "Opacity",
                    controls: [
                        {
                            id: 'opacity',
                            component: "numberRange", 
                            title: "Fade", 
                            description: "How much to fade the circle",
                            min: 0.25,
                            max: 100,
                            step: 0.25,
                            value: 50
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

            console.log("ADDING CANVAS EVENT HANDLERS");
            this.canvas.addEventListener('mousedown', this.mouseDown);
            this.canvas.addEventListener('mousemove', this.mouseMove);
            window.addEventListener('mouseup', this.mouseUp);

            this.canvas.addEventListener('touchstart', this.mouseDown);
            this.canvas.addEventListener('touchmove', this.mouseMove);
            window.addEventListener('touchend', this.mouseUp);


        },
        draw(){
            var _color;
            switch(this.color){
                case "random-color":
                    _color ="#" + Math.floor(Math.random()*16777215).toString(16);
                    break;
                default:
                    _color = this.getControlValue('color-picker');
                    break;
            }
            var style = this.getControlValue("style");

            this.ctx.beginPath();
            this.ctx.globalAlpha = this.getControlValue("opacity") / 100;
            this.ctx[style.toLowerCase() + "Style"] = _color; 
            this.ctx.arc(this.options.x, this.options.y, this.size, 0, 2 * Math.PI);
            this.ctx[style.toLowerCase()]();
        },
        getControlValue(id){
            
            var matches = this.tools.concat(this.colors).map(t=> t.controls.filter(c=> c.id === id));
            for(var i = 0; i<matches.length; i++){
                var control = matches[i][0];
                if(control && control != [])
                    return control.value;
            }
        },
        getSelectedColorControl(){
            var matches = this.colors.map(t=> t.controls.filter(c=> c.on === true));
            for(var i = 0; i<matches.length; i++){
                var control = matches[i][0];
                if(control && control != [])
                    return control.id;
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
        console.log('circles mounted')
        // add the plugin tools to the tray
        this.$store.commit('SetTools', this.tools);
        this.$store.commit('SetColors', this.colors);
        
        // get alerted when a toolbar item is used to change a setting
        this.$root.$on('SettingChanged', this.settingChanged);
       
        // set the canvas and context objects when the canvas is ready
        this.$root.$off('CanvasReady'); // NOTE: add multiple circle drawings at once
        this.$root.$on('CanvasReady', this.canvasReady);
        
    },
    props: []

    // trigger DrawCompleted event with complete drawing record (a typed object would be nice here)

    // trigger ArchiveLayer to save layer in history 

}
</script>