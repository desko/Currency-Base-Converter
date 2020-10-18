<template>
  <div id="app" class="wrapper"> 
    <header class="header-main-class">
      <div class="header-logo"><img src="./logo.png" class="header-logo-image"></div>
      <div class="header-banner"><img src="./banner.png" class="header-banner"></div>
    </header>
    <main class="content-box">
      <div class="m-side-bar">
        <ul class="side-bar-list">
          <li v-for="curr in currList" :key="curr.abr" @click="setCurrency(curr.abr)" class="side-bar-list-item">
            <country-flag :country='curr.flag' size='normal'/>
            {{curr.abr}}
          </li>
        </ul>
      </div>
      <div class="m-content">
        <component :selectedCurr="selectedCurr" v-bind:is="component" :key="componentKey" @changeBase="setCurrency($event)"></component>
      </div>
    </main>
    <footer class="footer-main">
      powered by: <a href="https://exchangeratesapi.io/">exchange rates api </a>/ Created by some debils
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
body{
  background-image: url("./background.jpg");
  background-size: cover;
  background-repeat:no-repeat;
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
  background-color: rgba(42, 54, 70, 0.781);
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
.footer-main {
  flex-shrink: 0;
  background-color: rgba(42, 54, 70, 0.781);
  font-size: 1.6rem;
  color: aliceblue;
}
.m-side-bar{
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  overflow:scroll;
  background-color: rgba(148, 181, 194, 0.75);
}
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
.m-content{
  width: 100%;
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
  font-size: 1.6rem;
  color: aliceblue;
}
</style>
