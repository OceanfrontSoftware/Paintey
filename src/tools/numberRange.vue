<template>
    <div class='tool'>
        <input ref="range" type="range" :step="componentData.step" :value="componentData.value" :min="componentData.min" :max="componentData.max"/>
        <span>{{componentData.value}}</span>
        
    </div>
</template>

<script>
export default {
    mounted(){
        this.$refs.range.addEventListener('change', ()=>{
            var value = this.$refs.range.value;
            this.$root.$emit('SettingChanged', value, this.componentData.id);
        });
    },
    props: ['componentData']

}
</script>

