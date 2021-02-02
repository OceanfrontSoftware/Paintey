<template>
    <div id="toolbar" class="toolbar">
      <div class="tool-row">
        <button v-on:click="newPainting()" id="NewPaintingButton"><i title="Start new painting" class="far fa-file iconMd"></i></button>
        <button style="display:none;"><i title="Open an existing picture" class="far fa-folder-open iconMd"></i></button>
        <button v-on:click="sharePainting()"><i title="Share or download your painting" class="far fa-share-square iconMd"></i></button>
        <button style="display:none;"><i title="Help using Paintey" class="far fa-question-circle iconMd"></i></button>
      </div>
      <div class="tool-row" style="display:none;">
        <button><i title="Move" class="far fa-hand-paper iconMd"></i></button>
        <button><i title="Zoom in" class="fas fa-search-plus iconMd"></i></button>
        <button><i title="Zoom out" class="fas fa-search-minus iconMd"></i></button>
        <button><i title="Undo" class="fas fa-undo iconMd"></i></button>
        <button><i title="Redo" class="fas fa-redo iconMd"></i></button>
      </div>
      <div class="tool-row">
        <button id='toolButton' v-on:click="panel = 'tools'" :class="panel == 'tools' ? 'selected' : ''">
          <i title="Plugin" class="fas fa-paint-brush iconMd"></i>
        </button>
        <button id='colorButton' v-on:click="panel = 'colors'"  :class="panel == 'colors' ? 'selected' : ''">
          <i title="Colors" class="fas fa-palette iconMd"></i>
        </button>
      </div>
      
      
      <div v-if="this.panel === 'tools'" class="tool-panel">
        <div class="tool-row">
          <h4>Circles</h4>
          <p>plugin by Nathan Townsend</p>
        </div>
        <div v-for="tool in this.$store.state.tools" class="setting" :key="tool.name">
          <div class="tool-row">
            <div v-for="control in tool.controls" :key="control.title">
              <component v-bind:componentData="control" v-bind:is="control.component" />
            </div>
          </div>
        </div>
      </div>

      <div  v-if="this.panel === 'colors'" class="tool-panel">
        <div v-for="color in this.$store.state.colors" class="setting" :key="color.name">
          <div class="tool-row">
            <div v-for="control in color.controls" :key="control.title">
              <component v-bind:componentData="control" v-bind:is="control.component" />
            </div>
          </div>
        </div>
      </div>
      <Share></Share>
    </div>
</template>

<script>
import colorPicker from '../tools/colorPicker.vue'
import randomColor from '../tools/randomColor.vue'
import dropdown from '../tools/dropdown.vue'
import numberRange from '../tools/numberRange.vue'
import Share from '../components/share.vue'

export default {
  name: 'Toolbar',
  
  data(){
    return {
      panel: 'tools',
      tools: []
    }
  },
  components: {
    colorPicker,
    randomColor,
    dropdown,
    numberRange,
    Share
  },
  methods: {
    
    newPainting(){
      this.$root.$emit("StartNewPainting");
    },
    sharePainting(){
      this.$root.$emit('showShareModal')
    }
  },
  mounted(){

  },
  updated() {

  }
}
</script>

<style scoped>

#toolbar {
    position: fixed;
    width: 260px;
    right: 0;
    height: 100%;
    border: 1px solid #555;
    border-width: 0 0 0 2px;
}

.tool-row {
  padding: 5px;
  border-color: #333;
  border-style: solid;
  border-width: 1px;
  
}

.iconMd { 
  font-size: 28px;
  color: #999;
}

.iconMd:hover{ 
  cursor: pointer;
  color: #333;
  border: 1px solid transparent;
}

.selected, .selected svg {
  color: #333;
}

.hidden {
  display: none;
}

</style>