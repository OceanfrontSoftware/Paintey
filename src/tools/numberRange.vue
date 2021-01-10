<template>
    <div class='tool'>
        <b-form-input ref="range" type="range" :step="componentData.step" v-model="componentData.value" :min="componentData.min" :max="componentData.max"></b-form-input>
        <span>{{componentData.value}}</span>
        
    </div>
</template>

<script>
export default {
    mounted(){
        /*this.$refs.range.addEventListener('change', ()=>{
            var value = this.$refs.range.value;
            this.$root.$emit('SettingChanged', value, this.componentData.id);
        });*/
    },
    props: ['componentData']

}
</script>

