<template>
  <div id="app">
    <RollCount :startVal="0" :endVal="100" :duration="100000"/>
    <AxiosDemo/>
    <div id="downAnimate">
      <div class="inner">
        <div class="bar">
          <div class="move-box"></div>
        </div>
        <div><button class="down-btn" id="cancelBtn">取消</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import RollCount from './components/roll-count.vue'
import AxiosDemo from './components/AxiosDemo';
export default {
  name: 'App',
  components: {
    RollCount,
    AxiosDemo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#downAnimate{
  display: none;
  position: fixed;
  z-index: 2020;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55,55,55,0.5);
}
.inner{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 300px;
  height: 130px;
  background: white;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;;
  align-items: center;
}
.bar{
  margin-top: 20px;
  width: 240px;
  height: 26px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
}
.move-box{
  width: 50px;
  height: 26px;
  border-radius: 4px;
  background-color: #409eff;
  position: absolute;
  animation: moveBar 0.8s linear infinite;
}
@keyframes moveBar{
  0%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(190px);
  }
}
.down-btn{
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  border: 1px solid #dcdfe6;
  background-color: #409eff;
  border-color: #409eff;
  outline: none;
}
</style>
