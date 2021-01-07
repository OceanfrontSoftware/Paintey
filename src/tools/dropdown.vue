<template>
    <div class='tool'>
        <select ref="control">
            <option v-for="item in componentData.values" :key="item.value" :value="item.value">{{item.name}}</option>
        </select>
        <p>{{componentData.description}}</p>
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

