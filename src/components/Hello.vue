<template>
  <div>
        <b-input-group prepend='Work' :append="work" class="mt-3">
          <b-form-input  id="work" v-model="work" type="range" min="1" max="60"></b-form-input>
        </b-input-group>

        <b-input-group prepend='Pause' :append="pause" class="mt-3">
          <b-form-input id="work" v-model="pause" type="range" min="1" max="60"></b-form-input>
        </b-input-group>
        <br>
        <gb-button full-width @click='start'>Start Timer</gb-button>

  </div>
</template>

<script>
export default {
  name: 'Hello',
  props: {
    msg: String
  },
  data(){
    return({
      work: 40,
      pause: 20
    })
  },
  methods: {
    start(){
      this.$emit('start', {work: this.work * 60, pause: this.pause * 60})
    }
  },
  computed: {
    ratio(){
      return this.work + ':' + this.pause
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.input-group-prepend >div{
  width: 70px !important;
}

.input-group-append >div{
  width: 44px !important;
}


#work{

}

 .input-group{
  background-color: #333;
}

.input-group-text{
  background-color: transparent;
  border-color: transparent;
  color: white;
}

.custom-range :active{
  background-color: transparent;
  border-color: transparent;
}


</style>
