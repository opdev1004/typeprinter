<template>
  <div class="TypePrinter">

    <div class="space"></div>

    <div id="Setting">

      <div id="GeneralSettings" class="element">

        <div class="element-item position"><h4>Print Duration: </h4> <div class="InputBox" @click="showPDSettings">{{ duration }} ms</div></div>
        <div id="PDSettings" class="element-item-setting">
          <h5>Print Duration Setting</h5>
          <input class="slide" type="range" min="0" :max='10000' step="100" v-model="duration">
          <input v-model="duration" placeholder="0~5000">
        </div>

        <div class="element-item"><h4>Horizontal Posision: </h4> <div class="InputBox" @click="showHPSettings">{{ horizontalPosition }} px</div></div>
        <div id="HPSettings" class="element-item-setting">
          <h5>Horizontal Posision Setting</h5>
          <input class="slide" type="range" min="0" :max='totalWidth' v-model="horizontalPosition">
          <input v-model="horizontalPosition" placeholder="0~Screen Width">
        </div>

        <div class="element-item"><h4>Vertical Posision: </h4> <div id="posY" class="InputBox" @click="showVPSettings">{{ verticalPosition }} px</div></div>
        <div id="VPSettings" class="element-item-setting">
          <h5>Vertical Posision Setting</h5>
          <input class="slide" type="range" min="0" :max='totalHeight' v-model="verticalPosition">
          <input v-model="verticalPosition" placeholder="0 ~ Screen Height">
        </div>

        <div class="element-item"><h4>Text Size: </h4> <div id="text-size" class="InputBox" @click="showTSSettings">{{ textSize }} px</div></div>
        <div id="TSSettings" class="element-item-setting">
          <h5>Text Size Setting</h5>
          <input class="slide" type="range" min="0" max="300" v-model="textSize">
          <input v-model="textSize" placeholder="Text Size">
        </div>

        <div class="element-item"><h4>Transparency: </h4> <div id="alpha" class="InputBox" @click="showAlphaSettings">{{ alpha }}</div></div>
        <div id="AlphaSettings" class="element-item-setting">
          <h5>Transparency Setting</h5>
          <input class="slide" type="range" min="0" max="1" step="0.01" v-model="alpha">
          <input v-model="alpha" placeholder="0.0~1.0" />
        </div>

      </div>

      <div id="text-color" class="element">
        <div class="element-item">
          <h4>Text Color: </h4>
          <div id="textColorView" class="ColorView" :style="textStyle" @click="showTextColorSettings"></div>
        </div>
        <div id="textColorSettings" class="element-item-setting">
          <Swatches id="text-swatches" v-model="textColor" />
          <div class="colorSetting-item"><h4>Hex</h4><input id="text-color" v-model="textColor.hex" placeholder="Hex Value"></div>
        </div>
      </div>

      <div id="outline-color" class="element">
        <div class="element-item">
          <h4>Outline Color: </h4>
          <div id="outlineColorView" class="ColorView" :style="outlineStyle" @click="showOutlineColorSwatches"></div>
        </div>
        <div id="outlineColorSettings" class="element-item-setting">
          <Swatches id="outline-swatches" v-model="outlineColor" />
          <div class="colorSetting-item"><h4>Hex: </h4><input id="outline-color" v-model="outlineColor.hex" placeholder="Hex Value"></div>
        </div>
      </div>

      <div id="background-color" class="element">
        <div class="element-item">
          <h4>Background Color: </h4>
          <div id="backgroundColorView" class="ColorView" :style="backgroundStyle" @click="showBackgroundColorSwatches"></div>
        </div>
        <div id="backgroundColorSettings" class="element-item-setting">
          <Swatches id="background-swatches" v-model="backgroundColor" />
          <div class="colorSetting-item"><h4>Hex: </h4><input id="background-color" v-model="backgroundColor.hex" placeholder="Hex Value"></div>
        </div>
        <div class="element-item"><h5>Background Transparency: </h5> <div id="backgroundAlpha" class="InputBox" @click="showBGASettings">{{ backgroundAlpha }}</div></div>
        <div id="BGASettings" class="element-item-setting">
          <h5>Background Transparency Setting</h5>
          <input class="slide" type="range" min="0" max="1" step="0.01" v-model="backgroundAlpha">
          <input id="backgroundAlpha" v-model="backgroundAlpha" placeholder="0.0~1.0" />
        </div>
      </div>

    </div>


    <div class="space"></div>

  </div>
</template>

<script>
import { Swatches } from 'vue-color';

export default {
  name: 'TypePrinter',
  components: {
    Swatches
  },
  data: function() {
    return {
      duration: 500,
      totalWidth: 1920,
      totalHeight: 1080,
      horizontalPosition: 0,
      verticalPosition: 0,
      textSize: 48,
      alpha: 1,
      textColor: {
        hex: '#FFFFFF',
        hsl: { h: 0, s: 0, l: 100, a: 1 },
        hsv: { h: 0, s: 0, v: 100, a: 1 },
        rgba: { r: 255, g: 255, b: 255, a: 1 },
        a: 1
      },
      outlineColor: {
        hex: '#000000',
        hsl: { h: 0, s: 0, l: 0, a: 1 },
        hsv: { h: 0, s: 0, v: 0, a: 1 },
        rgba: { r: 0, g: 0, b: 0, a: 1 },
        a: 1
      },
      backgroundColor: {
        hex: '#000000',
        hsl: { h: 0, s: 0, l: 0, a: 1 },
        hsv: { h: 0, s: 0, v: 0, a: 1 },
        rgba: { r: 0, g: 0, b: 0, a: 1 },
        a: 1
      },
      backgroundAlpha: 0.8
    }
  },
  watch: {
    duration: function(val){
      this.updateSettings(val);
    },
    horizontalPosition: function(val){
      this.updateSettings(val);
    },
    verticalPosition: function(val){
      this.updateSettings(val);
    },
    textSize: function(val){
      this.updateSettings(val);
    },
    alpha: function(val){
      this.updateSettings(val);
    },
    textColor: function(val){
      this.showTextColorSettings(val);
      this.updateSettings(val);
    },
    outlineColor: function(val){
      this.showOutlineColorSwatches(val);
      this.updateSettings(val);
    },
    backgroundColor: function(val){
      this.showBackgroundColorSwatches(val);
      this.updateSettings(val);
    },
    backgroundAlpha: function(val){
      this.updateSettings(val);
    }
  },
  computed: {
    textStyle(){
      return {
        'background-color' : "rgba(" + this.textColor.rgba.r + "," + this.textColor.rgba.g + "," + this.textColor.rgba.b + "," + this.textColor.rgba.a + ")"
      }
    },
    outlineStyle(){
      return {
        'background-color' : "rgba(" + this.outlineColor.rgba.r + "," + this.outlineColor.rgba.g + "," + this.outlineColor.rgba.b + "," + this.outlineColor.rgba.a + ")"
      }
    },
    backgroundStyle(){
      return {
        'background-color' : "rgba(" + this.backgroundColor.rgba.r + "," + this.backgroundColor.rgba.g + "," + this.backgroundColor.rgba.b + "," + this.backgroundColor.rgba.a + ")"
      }
    }
  },
  methods: {
    showPDSettings: function(e) {
      if(e){
        if(document.getElementById("PDSettings").style.display == "block"){
          document.getElementById("PDSettings").style.display = "none";
        } else {
          document.getElementById("PDSettings").style.display = "block";
        }
      }
    },
    showHPSettings: function(e) {
      if(e){
        if(document.getElementById("HPSettings").style.display == "block"){
          document.getElementById("HPSettings").style.display = "none";
        } else {
          document.getElementById("HPSettings").style.display = "block";
        }
      }
    },
    showVPSettings: function(e) {
      if(e){
        if(document.getElementById("VPSettings").style.display == "block"){
          document.getElementById("VPSettings").style.display = "none";
        } else {
          document.getElementById("VPSettings").style.display = "block";
        }
      }
    },
    showTSSettings: function(e) {
      if(e){
        if(document.getElementById("TSSettings").style.display == "block"){
          document.getElementById("TSSettings").style.display = "none";
        } else {
          document.getElementById("TSSettings").style.display = "block";
        }
      }
    },
    showAlphaSettings: function(e) {
      if(e){
        if(document.getElementById("AlphaSettings").style.display == "block"){
          document.getElementById("AlphaSettings").style.display = "none";
        } else {
          document.getElementById("AlphaSettings").style.display = "block";
        }
      }
    },
    showBGASettings: function(e) {
      if(e){
        if(document.getElementById("BGASettings").style.display == "block"){
          document.getElementById("BGASettings").style.display = "none";
        } else {
          document.getElementById("BGASettings").style.display = "block";
        }
      }
    },
    showTextColorSettings: function(e) {
      if(e){
        if(document.getElementById("textColorSettings").style.display == "block"){
          document.getElementById("textColorSettings").style.display = "none";
        } else {
          document.getElementById("textColorSettings").style.display = "block";
        }
      }
    },
    showOutlineColorSwatches: function(e) {
      if(e){
        if(document.getElementById("outlineColorSettings").style.display == "block"){
          document.getElementById("outlineColorSettings").style.display = "none";
        } else {
          document.getElementById("outlineColorSettings").style.display = "block";
        }
      }
    },
    showBackgroundColorSwatches: function(e) {
      if(e){
        if(document.getElementById("backgroundColorSettings").style.display == "block"){
          document.getElementById("backgroundColorSettings").style.display = "none";
        } else {
          document.getElementById("backgroundColorSettings").style.display = "block";
        }
      }
    },
    updateSettings: function(e) {
      if(e){
        window.postMessage({
          type: 'update.settings',
          data: {
            duration: this.duration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            textSize: this.textSize,
            alpha: this.alpha,
            textColor: this.textColor.rgba,
            outlineColor: this.outlineColor.rgba,
            backgroundColor: this.backgroundColor.rgba,
            backgroundAlpha: this.backgroundAlpha
          }
        });
      }
    }
  },
  created: function() {
    this.totalWidth = screen.width;
    this.totalHeight = screen.height;
    window.postMessage({
      type: 'loaded'
    });
    window.addEventListener('message', event => {
      var message = event.data;
      if(message.type == 'load.settings')
      {
        var data = message.data;
        for(var i = 0; i < data.length; i++){
          if(data[i] === null || data[i] === "undefined"){
            this.updateSettings(message.type);
            window.postMessage({
              type: 'loaded'
            });
          }
        }
        this.duration = message.data.duration;
        this.horizontalPosition = message.data.horizontalPosition;
        this.verticalPosition = message.data.verticalPosition;
        this.textSize = message.data.textSize;
        this.alpha = message.data.alpha;
        this.textColor.rgba = message.data.textColor;
        this.outlineColor.rgba = message.data.outlineColor;
        this.backgroundColor.rgba = message.data.backgroundColor;
        this.backgroundAlpha = message.data.backgroundAlpha;
      }
      else if(message.type == 'create.settings') {
        window.postMessage({
          type: 'update.settings',
          data: {
            duration: this.duration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            textSize: this.textSize,
            alpha: this.alpha,
            textColor: this.textColor.rgba,
            outlineColor: this.outlineColor.rgba,
            backgroundColor: this.backgroundColor.rgba,
            backgroundAlpha: this.backgroundAlpha
          }
        });
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
.TypePrinter {
  background-color: #222233;
  color: #ffffff;
  user-select: none;
}

input {
  width: calc(100% - 4px);
  margin: 0px auto 10px auto;
}

.slide { cursor: pointer; }

#Setting {
  display: inline-block;
  margin: 10px;
  width: 300px;
  vertical-align: top;
}

.element-item h4,
.element-item h5 {
  padding: 0px;
  width: 175px;
  margin: 5px 5px 0px 0px;
  display: inline-block;
  vertical-align: top;
}

.element-item .ColorView {
  display: inline-block;
  vertical-align: top;
  width: 20px;
  height: 20px;
  margin: 5px 5px 0px 0px;
  border-radius: 2px;
  border: 1px solid #cccccc;
  cursor: pointer;
}

.element-item .InputBox {
  height: 17px;
  cursor: pointer;
  font-size: 14px;
  color: #000000;
  width: 100px;
  display: inline-block;
  margin: 5px 5px 0px 0px;
  background-color: #ffffff;
  border-radius: 2px;
  border: 1px solid #cccccc;
  padding:0px;
}

.element-item input {
  width: 100px;
  display: inline-block;
  margin: 5px 5px 0px 0px;
  border-radius: 2px;
  border: 1px solid #cccccc;
  padding:1px;
}

.colorSetting-item h4 {
  padding: 0px;
  width: 165px;
  margin: 5px 5px 0px 0px;
  display: inline-block;
  vertical-align: top;
}

.colorSetting-item input {
  width: 100px;
  display: inline-block;
  margin: 5px 5px 0px 0px;
  border-radius: 2px;
  border: 1px solid #cccccc;
  padding:1px;
}

.element-item-setting {
  display: none;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding: 5px;
  margin: 5px auto;
}

.element-item-setting h4,
.element-item-setting h5 {
  padding: 0px;
  margin: 5px auto;
}

.vc-swatches {
  margin: 0px auto;
  padding: 0px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: none;
}

.vc-slider {
  width: 100%;
  margin: 10px auto 20px auto;
  padding: 0px;
}

.vc-hue {
  display: none !important;
}

</style>
