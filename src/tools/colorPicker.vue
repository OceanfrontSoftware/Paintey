<template>
    <div class='tool'>
        <b-form-input ref="control" type="color" v-model="componentData.value"></b-form-input>
    </div>
</template>

<script>
export default {
    mounted(){
        this.$refs.control.addEventListener('change', ()=>{
            var value = this.$refs.control.value;
            this.$root.$emit('SettingChanged', value, this.componentData.id);
        });
    },
    props: ['componentData']

}
</script>

