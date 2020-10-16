<template>
  <div id="app" class="wrapper"> 
    <header class="border header-main-class">
      <div class="header-logo"><img src="./logo.png" class="header-logo-image"></div>
      <div class="header-banner"><img src="./banner.png" class="header-banner"></div>
    </header>
    <main class="content-box">
      <div class="m-side-bar border">
        <ul class="side-bar-list">
          <li v-for="curr in currList" :key="curr.abr" @click="setCurrency(curr.abr)" class="side-bar-list-item">
            <country-flag :country='curr.flag' size='normal'/>
            {{curr.abr}}
          </li>
        </ul>
      </div>
      <div class="m-content border">
        <component :selectedCurr="selectedCurr" v-bind:is="component" :key="componentKey" @changeBase="setCurrency($event)"></component>
      </div>
    </main>
    <footer class="border">
      powered by: <a href="https://exchangeratesapi.io/">exchange rates api </a><br>Created by some debils
    </footer>
  </div>
</template>

<script>
import Converter from './components/Converter.vue'
import clist from './json/clist.json'
import CountryFlag from 'vue-country-flag'
export default {
  name: 'App',
  components: {
     "converter":Converter,
    CountryFlag,
  },
  data(){
    return{
      currList: clist.currency,
      selectedCurr: '',
      component : '',
      componentKey: 0,
    }
  },
  methods: {
    setCurrency(str){
      this.selectedCurr = str;
      this.component = 'converter';
      this.componentKey++;
    },
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
}
html, body{
    margin: 0px;
    height: 100%;
}
.wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height:100%;
    flex-shrink: 0;
}
.header-main-class{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 10%;
}
.header-logo{
  width: 10%;
  height: 100%;
}
.header-logo-image{
  width: 100%;
  height: 100%;
}
.header-banner{
  width: 90%;
  height: 100%;
}
.header-banner-image{
  width: 100%;
  height: 100%;
}
.content-box {
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    height: 80%;
}
footer {
    flex-shrink: 0;
}
.m-side-bar{
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  overflow:auto;
}
.m-content{
  width: 80%;
  margin-right: 10%;
}
.side-bar-list{
 padding: 0;
 display: flex;
 flex-direction: column;
}
.side-bar-list-item{
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-shrink: 1;
  align-items: center;
}
</style>
