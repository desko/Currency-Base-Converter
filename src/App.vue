<template>
  <div id="app" class="wrapper"> 
    <header class="header-main-class">
      <div class="header-logo" @click="goHome"><img src="./pics/cb2/logo_transparent.png" class="header-logo-image"></div>
      <div class="header-nav">
        <!--<img src="./pics/banner.png" class="header-banner">-->
        <div class="header-btn" @click="goHome">
          Home
        </div>
        <div class="header-btn">
          About
        </div>
        <div class="header-btn-select header-btn">
          <select v-model="fCurr" @change="changeCurrency(fCurr)" class="header-list">
          <option disabled class="header-list-item">{{fCurr}}</option>
          <option v-for="curr in currList" @click="setCurrency(curr.abr)" :key="curr.abr" class="header-list-item">
            <div>
              <country-flag :country='curr.flag' size='small'/>
              {{curr.abr}}
            </div>
          </option>
        </select>
        </div>
      </div>
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
      <span class="footer-span">powered by: <a href="https://exchangeratesapi.io/">exchange rates api </a></span>
      <span class="footer-span">Created by D. Dimitrov & V. Ivanov</span> 
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
      fCurr: 'EUR',
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
      this.$router.push('/currency/'+data.fCurr+'/'+data.sVal.toString()+'/to/'+data.sCurr+'/'+data.fVal.toString()).catch(()=>{});
      this.componentKey++;
    },
    goHome(){
      this.$router.push('/').catch(()=>{});
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
    width: 100%;
}
.wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    width: 100%;
    flex-shrink: 0;
}
.header-main-class{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 15%;
  background-color: rgba(42, 54, 70, 0.781);
}
.content-box {
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    width: 100%;
    height: 75%;
}
.m-content{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
.header-nav{
  width: 67%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: rgb(0, 0, 0);
}
.header-btn{
  background-color: rgb(166, 207, 243);
  border-radius: 25px;
  width: 10%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  margin-right: .3%;
}
.header-list{
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: inherit;
}
.header-list-item{
  background-color: rgb(255, 255, 255);
}
.header-banner-image{
  width: 100%;
  height: 100%;
}
.footer-main {
  display: flex;
  flex-shrink: 0;
  background-color: rgba(42, 54, 70, 0.781);
  font-size: 100%;
  color: aliceblue;
}
@media only screen and (min-width: 280px) {
  body{
    background-image: url("./pics/background2.jpg");
    background-size: cover;
    background-repeat:no-repeat;
  }
  .footer-main{
    border-radius: 25px 25px 0px 0px ;
  }
  .wrapper{
    justify-content: space-evenly;
  }
  .header-logo-image{
    width: auto;
    height: 100%;
    background-size: cover;
    background-repeat:no-repeat;
  }
  .header-main-class{
    justify-content: space-evenly;
    border-radius: 0px 0px 25px 25px;
  }
  .header-logo{
    width: 33%;
  }
  .header-nav{
    justify-content: space-evenly;
  }
  .header-btn{
    width: 30%;
    height: 50%;
    border-radius: 15px;
    font-size: 140%;
    margin: 0;
  }
  .m-side-bar{
    display: none;
  }
  .footer-main{
    flex-direction: column;
  }
}
@media only screen and (min-width: 760px) {
  body{
    background-image: url("./pics/background.jpg");
    background-size: cover;
    background-repeat:no-repeat;
  }
}
@media only screen and (min-width: 1000px) {
  
body{
  background-image: url("./pics/background.jpg");
  background-size: cover;
  background-repeat:no-repeat;
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
.header-nav{
  justify-content: flex-start;
}
.header-btn{
  background-color: rgb(166, 207, 243);
  border-radius: 25px;
  width: 20%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  margin-right: .3%;
}
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
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
.header-btn-select{
  display: none;
}
}
</style>
