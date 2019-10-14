<template>
  <div class="Main">
    <div id="text" class="" :style="textStyle">
      {{ printKeys }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data: function() {
    return {
      keys: [],
      display: 'none',
      duration: 500,
      horizontalPosition: 0,
      verticalPosition: 0,
      textSize: '48px',
      alpha: 1,
      textColor: 'rbga(255, 255, 255, 1)',
      outlineColor: 'rbga(0, 0, 0, 1)',
      backgroundColor: 'rbga(0, 0, 0, 1)',
      backgroundAlpha: 0.8
    }
  },
  computed: {
    textStyle(){
      return {
        'display' : this.display,
        'margin' : this.verticalPosition + 'px auto auto ' + this.horizontalPosition + 'px',
        'font-size' : this.textSize + 'px',
        'opacity' : this.alpha,
        'color' : "rgba(" + this.textColor.r + "," + this.textColor.g + "," + this.textColor.b + "," + this.textColor.a + ")",
        'text-shadow': '-1px -1px 0 ' + "rgba(" + this.outlineColor.r + "," + this.outlineColor.g + "," + this.outlineColor.b + "," + this.outlineColor.a + ")"
                        + ', 1px -1px 0 ' + "rgba(" + this.outlineColor.r + "," + this.outlineColor.g + "," + this.outlineColor.b + "," + this.outlineColor.a + ")"
                        + ', -1px 1px 0 ' + "rgba(" + this.outlineColor.r + "," + this.outlineColor.g + "," + this.outlineColor.b + "," + this.outlineColor.a + ")"
                        + ', 1px 1px 0 ' + "rgba(" + this.outlineColor.r + "," + this.outlineColor.g + "," + this.outlineColor.b + "," + this.outlineColor.a + ")",
        'background-color' : "rgba(" + this.backgroundColor.r + "," + this.backgroundColor.g + "," + this.backgroundColor.b + "," + this.backgroundAlpha + ")",
      }
    },
    printKeys: function(){
      var result = "";
      for(var i = 0; i < this.keys.length; i++) {
        if(result == "") result = this.keys[i];
        else result = result + " + " + this.keys[i];
      }
      return result;
    }
  },
  methods: {
  },
  created: function() {
    window.addEventListener('message', event => {
      var message = event.data;
      if(message.type == 'load.settings')
      {
        this.duration = message.data.duration;
        this.horizontalPosition = message.data.horizontalPosition;
        this.verticalPosition = message.data.verticalPosition;
        this.textSize = message.data.textSize;
        this.alpha = message.data.alpha;
        this.textColor = message.data.textColor;
        this.outlineColor = message.data.outlineColor;
        this.backgroundColor = message.data.backgroundColor;
        this.backgroundAlpha = message.data.backgroundAlpha;
      }
      else if(message.type == 'keydown')
      {
        if(!this.keys.includes(message.data))
        {
          this.display = "inline-block";
          this.keys.push(message.data);
        }
      }
      else if(message.type == 'keyup')
      {
        if(this.keys.includes(message.data))
        {
          setTimeout(function(){
            var pos = this.keys.indexOf(message.data);
            this.keys.splice(pos, 1);
            if(this.keys.length < 1) {
              this.display = "none";
            }
          }.bind(this), this.duration);
        }
      }
      else
      {
        return;
      }
      event.preventDefault();
    });
  },
  destroyed: function() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#text {
  display: none;
  position: absolute;
  left: 0px;
  border-radius: 5px;
  padding: 10px;
  z-index: 100;
}

</style>
