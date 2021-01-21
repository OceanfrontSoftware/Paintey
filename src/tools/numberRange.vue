<template>
    <div class='tool'>
        <h5 :title="componentData.description">{{componentData.title}}</h5>
        <b-form-input ref="range" type="range" :step="componentData.step" v-model="componentData.value" :min="componentData.min" :max="componentData.max"></b-form-input>
    </div>
</template>

<script>
export default {
    mounted(){

    },
    props: ['componentData']

}
</script>

