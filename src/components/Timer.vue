<template>
  <div style='color: white'>
    <p><b-badge pill variant="dark">{{state.phase==='work'?'work':'break'}}</b-badge></p>
    <b-progress height="2rem" :variant='state.phase==="work"?"danger":"success"' :value="state.remaining" :max="state.origin" class="mb-3">
    </b-progress>
    <div>
    <b-button-group style='width: 100%'>
      <b-button :variant='state.phase==="work"?"outline-danger":"outline-success"' @click='$emit("change", -5)'>-5</b-button>
      <b-button :variant='state.phase==="work"?"outline-danger":"outline-success"' @click='$emit("change", -1)'>-1</b-button>
      <b-button :variant='state.phase==="work"?"danger":"success"' @click='$emit("togglePause")'>
        <b-icon-pause-fill v-show='state.playstate'/>
        <b-icon-play-fill v-show='!state.playstate'/>
      </b-button>
      <b-button :variant='state.phase==="work"?"outline-danger":"outline-success"' @click='$emit("change", 1)'>+1</b-button>
      <b-button :variant='state.phase==="work"?"outline-danger":"outline-success"' @click='$emit("change", 5)'>+5</b-button>
    </b-button-group>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: ['state']
}
</script>

<style scoped>

</style>
