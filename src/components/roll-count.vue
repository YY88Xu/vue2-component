<template>
    <p>{{counter}}</p>
</template>
<script>
export default {
  name: "roll-count",
  props: {
    //开始的值
    startVal: {
      type: Number,
      default: 0,
    },
    //结束的值
    endVal: {
      type: Number,
      default: 0,
    },
    //ms 单位
    duration: {
      type: Number,
      default: 0,
    },
  },
  watch: {
      startVal(newVal){
          if(this.animationId){
              window.cancelAnimationFrame(this.animationId);
              this.counter = newVal;
              this.rollCount(newVal, this.endVal, this.duration);
          }
      }
  },
  data() {
    return {
      counter: this.startVal,
      animationId: null
    };
  },
  mounted(){
      this.rollCount(this.startVal, this.endVal, this.duration);
  },
  beforeDestroy(){
    window.cancelAnimationFrame(this.animationId);
  },
  methods: {
    rollCount(startVal, endVal, duration) {
      this.animationId = window.requestAnimationFrame(step);
      const start = new Date().getTime();
      const that = this;
      function step() {
        const now = new Date().getTime() - start;
        const data = that.getData(0, duration, now, startVal, endVal);
        if (data < endVal) {
          if (data != that.counter) {
            that.counter = data;
          }
          that.animationId = window.requestAnimationFrame(step);
        } else {
          that.counter = endVal;
          console.log("cancel");
          window.cancelAnimationFrame(that.animationId);
        }
      }
    },
    //区间映射 [t1, t2] 到 [min, max]
    getData(t1, t2, t, min, max) {
      return (min + [(max - min) / (t2 - t1)] * (t - t1)).toFixed(0);
    },
  },
};
</script>