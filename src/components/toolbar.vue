<template>
    <div id="toolbar" class="testimonial-group">
        <div class="row text-center">
            <div v-for="tool in tools" class="setting col-lg-1 col-3" :key="tool.name">
                <span class="dot"></span>
                <br/>
                {{tool.name}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        tools: [
            {
                name: "Size"
            },
            {
                name: "Line Width"
            },
            {
                name: "Fill Style"
            },
            {
                name: "Color"
            },
            {
                name: "Another"
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