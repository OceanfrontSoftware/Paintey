<template>
    <div class='tool'>
        <h5 :title="componentData.description">
            <input :name="componentData.group" v-bind:checked="componentData.on" @change="ToggleValue()" type="radio"/>  
            {{componentData.title}}
        </h5>
        <b-form-input ref="control" type="color" v-model="componentData.value"></b-form-input>
    </div>
</template>

<script>
export default {
    methods:{
        ToggleValue(){
            this.$root.$emit("ColorToolSelected", this.componentData.id)
        },
        ToolSelected(id){
            this.componentData.on = id === this.componentData.id;
        }
    },
    mounted(){
        this.$root.$on('ColorToolSelected', this.ToolSelected);
        this.componentData.GetValue = this.GetValue;
    },
    props: ['componentData']

}
</script>

