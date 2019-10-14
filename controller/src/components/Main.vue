<template>
  <div class="Main">
    <TypePrinter />
  </div>
</template>

<script>
import TypePrinter from './TypePrinter.vue'

export default {
  name: 'Main',
  components: {
    TypePrinter
  },
  data: function() {
    return {
    }
  },
  watch: {
  },
  computed: {
  },
  methods: {
  },
  created: function() {
  },
  destroyed: function() {
  }
}
//'rgba(' + this.color.rgba.r + ', ' + this.color.rgba.b + ', ' + this.color.rgba.g + ', ' + this.color.rgba.a + ')'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Main {
  background-color: #222233;
  color: #ffffff;
}
</style>
