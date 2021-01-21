<template>
    <div class='tool'>
        <h5 :title="componentData.description">{{componentData.title}}</h5>
        <b-form-select v-model="componentData.value" :options="componentData.values"></b-form-select>
    </div>
</template>

<script>
export default {
    mounted(){
        /*this.$refs.control.addEventListener('change', ()=>{
            var value = this.$refs.control.value;
            this.$root.$emit('SettingChanged', value, this.componentData.id);
        });*/
    },
    props: ['componentData']

}
</script>

