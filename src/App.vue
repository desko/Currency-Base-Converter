<template>
  <div id="app" class="wrapper"> 
    <header class="header-main-class">
      <div class="header-logo" @click="goHome"><img src="./pics/cb/logo_transparent.png" class="header-logo-image"></div>
      <div class="header-banner"><img src="./pics/banner.png" class="header-banner"></div>
    </header>
    <main class="content-box">
      <div class="m-side-bar">
        <ul class="side-bar-list">
          <li v-for="curr in currList" :key="curr.abr" @click="setCurrency(curr.abr)" class="side-bar-list-item">
            <router-link :to="'/currency/'+curr.abr+'/1/to/'+curr.abr+'/1'" class="side-bar-list-item-link" exact>
              <country-flag :country='curr.flag' size='normal'/>
              {{curr.abr}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="m-content">
        <!--<component :selectedCurr="selectedCurr" v-bind:is="component" :key="componentKey" @changeBase="setCurrency($event)"></component>-->
        <router-view @changeBase="changeCurrency($event)" @swapCurrency="swapCurrency($event)" :key="componentKey"></router-view>
      </div>
    </main>
    <footer class="footer-main">
      powered by: <a href="https://exchangeratesapi.io/">exchange rates api </a>/ Created by D. Dimitrov & V. Ivanov
    </footer>
  </div>
</template>

<script>
import clist from './json/clist.json'
import CountryFlag from 'vue-country-flag'
export default {
  name: 'App',
  components: {
    //"converter":Converter,
    CountryFlag,
  },
  data(){
    return{
      currList: clist.currency,
      fCurr: '',
      sCurr: '',
      componentKey: 0,
    }
  },
  methods: {
    setCurrency(str){
      this.fCurr = str;
      this.componentKey++;
    },
    changeCurrency(str){
      this.$router.push('/currency/'+str+'/1/to/'+str+'/1/');
      this.componentKey++;
    },
    swapCurrency(data){
      this.$router.push('/currency/'+data.fCurr+'/'+data.sVal.toString()+'/to/'+data.sCurr+'/'+data.fVal.toString());
      this.componentKey++;
    },
    goHome(){
      this.$router.push('/');
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
  background-image: url("./pics/background.jpg");
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
  height: 15%;
  background-color: rgba(42, 54, 70, 0.781);
}
.header-logo{
  width: 15%;
  height: 100%;
}
.header-logo-image{
  height: 100%;
  background-size: cover;
  background-repeat:no-repeat;
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
  border-radius: 0px 25px 25px 0px;
}
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
.m-content{
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.side-bar-list{
 padding: 0;
 width: 75%;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
}
.side-bar-list-item{
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-shrink: 1;
  align-items: center;
}
.side-bar-list-item-link{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-shrink: 0;
  align-items: center;
  text-decoration: none;
  font-size: 1.6rem;
  color: aliceblue;
  border-radius: 15px;
}
.side-bar-list-item-link:hover{
  background-color: rgb(50, 2, 105);
  color: aliceblue;
  text-decoration: none;
}
.router-link-exact-active{
  background-color: rgb(50, 2, 105);
  color: aliceblue;
  text-decoration: none;
}
</style>
