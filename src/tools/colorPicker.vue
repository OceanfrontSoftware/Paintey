<template>
    <div class='tool'>
        <input ref="control" type="color" :value="componentData.value" />
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

