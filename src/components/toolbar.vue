<template>
    <div id="toolbar" class="testimonial-group">
        <div class="row text-center">
            <div v-for="tool in tools" class="setting col-3" :key="tool.name">
                <h3>{{tool.name}}</h3>
                <div v-for="control in tool.controls" :key="control.title">
                  <component v-bind:componentData="control" v-bind:is="control.component" />
                </div>
            </div>
        </div>
        <numberRange></numberRange>
    </div>
    
</template>

<script>
import numberRange from '../tools/numberRange.vue'
export default {
  name: 'App',
  components: {
    numberRange
  },
    data() {
      return {
        tools: [
            {
                name: "Size",
                controls: [
                  {
                    component: "numberRange", 
                    title: "Size", 
                    description: "The size of the circle"
                  }
                ]
            }
        ]
      }
    },
    methods: {
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
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
.testimonial-group > .row {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
.testimonial-group > .row > .setting {
  display: inline-block;
}

/* Decorations */

</style>