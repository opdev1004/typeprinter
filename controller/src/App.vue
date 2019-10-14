<template>
  <div id="app" :style="{ height: height }">
    <Main ref="main" />
  </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'app',
  components: {
    Main
  },
  data: function() {
    return {
      height: "450px"
    }
  },
  created: function() {
    this.height = window.innerHeight + "px";
    window.addEventListener('resize', event => {
      this.height = window.innerHeight + "px";
      event.preventDefault();
    });
  },
  destroyed: function() {
  }
}
</script>

<style>
html {
  padding: 0px;
  margin: 0px;
}

body {
  padding: 0px;
  margin: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #222233;
  color: #ffffff;
  width: 100%;
  margin: 0px;
  padding: 0px;
}

.space {
  padding: 0px;
  margin:0px;
  height:1px;
}

</style>
