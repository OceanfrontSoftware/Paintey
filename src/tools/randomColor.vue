<template>
    <div class='tool'>
        <h5 :title="componentData.description">
            <input :name="componentData.group" v-bind:checked="componentData.on" @change="ToggleValue()" type="radio"/>  
            {{componentData.title}}
        </h5>
    </div>
</template>

<script>
export default {
     methods:{
        ToggleValue(){
            //this.componentData.on = !this.componentData.on;
            this.$root.$emit("ColorToolSelected", this.componentData.id)
        },
        ToolSelected(id){
            this.componentData.on = id === this.componentData.id;
        }
    },
    mounted(){
        this.$root.$on('ColorToolSelected', this.ToolSelected);
    },
    props: ['componentData']

}
</script>

