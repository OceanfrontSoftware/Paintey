<template>
    <div class='tool'>
        <h5 :title="componentData.description"><input type="radio" :name="componentData.group" id="randomColor"/>  {{componentData.title}}</h5>
        <b-form-input ref="control" type="color" v-model="componentData.value"></b-form-input>
    </div>
</template>

<script>
export default {
    mounted(){

    },
    props: ['componentData'],
    mounted(){
        this.componentData.value="#abc";
    }

}
</script>

