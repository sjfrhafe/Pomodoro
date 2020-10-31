<template>
  <div id="app">
    <b-jumbotron id='hello' text-variant="light" border-variant="dark">
      <template #header>{{(scene==="hello")?'':(toTwo(time.min) + ':' + toTwo(time.sec))}}
</template>
    <Hello v-show='scene==="hello"' @start='start'/>
    <Timer v-show='scene==="timer"' :state='state' @togglePause='togglePause' @change='change'/>
  </b-jumbotron>

    <div id='background'></div>

    <audio controls id='sound'>
      <source src="./assets/Swoosh.mp3" type="audio/mpeg">
    </audio>

  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import Timer from './components/Timer.vue'

export default {
  name: 'App',
  data(){
    return({
      scene: 'hello',
      times: {work: 0, pause: 0},
      timer: null,
      state: {phase: 'Pomodoro'}
    })
  },
  methods: {
    start(times){
      document.getElementById('sound').play()
      this.times = times
      this.scene = 'timer'
      this.state = {remaining: parseInt(times.work), origin: parseInt(times.work), phase: 'work', playstate: true}
      this.timer = setInterval(this.decrease, 1000)
    },
    decrease(){
      if(this.state.remaining > 1){
        this.state.remaining--
      }else if(this.state.phase==='work'){
        this.state = {remaining: parseInt(this.times.pause), origin: parseInt(this.times.pause), phase: 'pause', playstate: true}
      }else{
        this.state = {remaining: parseInt(this.times.work), origin: parseInt(this.times.work), phase: 'work', playstate: true}
      }
    },
    toTwo(inp){
      return inp.toString().length === 1?'0' + inp:inp
    },
    togglePause(){
      if(this.timer){
        clearInterval(this.timer)
        this.timer = null
        this.state.playstate = false;
      }else{
        this.timer = setInterval(this.decrease, 1000)
        this.state.playstate = true;
      }
    },
    change(dif){
      document.getElementById('sound').play()
      let nVal = this.state.remaining + (dif * 60)
      if(nVal < 0){
        this.state.remaining = 0
      }else if(nVal > this.state.origin){
        this.state.remaining = parseInt(this.state.origin)
      }else{
        this.state.remaining = parseInt(nVal)
      }
    }
  },
  computed: {
    time(){
      return {min: parseInt(this.state.remaining/60), sec: this.state.remaining%60}
    }
  },
  components: {
    Hello,
    Timer
  }
}
</script>

<style>
  #hello{
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: #222;
    max-width: 95%;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  user-select: none;
}
#background{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1530556626422-4471d585bb73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  z-index: -100;
}

#sound{
  display: none;
}
</style>
