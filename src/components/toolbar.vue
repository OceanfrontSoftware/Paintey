<template>
    <div id="toolbar" class="toolbar">
      <h2>{{this.$store.state.test}}</h2>
        <div class="row text-center">
            <div v-for="tool in this.$store.state.tools" class="setting col-1" :key="tool.name">
                <h3>{{tool.name}}</h3>
                <div v-for="control in tool.controls" :key="control.title">
                  <component v-bind:componentData="control" v-bind:is="control.component" />
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import numberRange from '../tools/numberRange.vue'
export default {
  name: 'Toolbar',
  data(){
    return {
      tools: []
    }
  },
  components: {
    numberRange
  },
  updated() {
    this.$root.$emit('LayoutChanged');
  }
}
</script>

<style scoped>
.dot {
  height: 50px;
  width: 50px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

#toolbar {
    position: fixed;
    bottom: 0;
    border-top: 1px solid #555;
    width: 100%;
    padding-top: 5px;
}
/* The heart of the matter */
.toolbar > .row {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
.toolbar > .row > .setting {
  display: inline-block;
}

/* Decorations */

</style>