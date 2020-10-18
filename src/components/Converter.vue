<template>
  <div class="converter">
    <div class="container converter-row rates-list">
      <div v-for="curr in currRates" :key="curr" class="rates-list-item">
          <div class="rates-list-item-top border">
            {{curr}}
            <country-flag :country='sliceEnd(curr)' size='normal'/>
          </div>
          <div class="rates-list-item-bot border">
            {{getKeysToObject(curr)}}
          </div>
      </div>
    </div>
    <div class="converter-row">
      <div class="converter-item">
        <select v-model="firstCurr" @change="changeBase" class="curr-list">
          <option disabled class="curr-list-item">{{firstCurr}}</option>
          <option v-for="curr in currList" :key="curr.abr" class="curr-list-item">
            <div class="curr-list-item-div">
              <country-flag :country='curr.flag' size='small'/>
              {{curr.abr}}
            </div>
          </option>
        </select>
        <div class="user-input">
          <input type="number" class="user-input-text" v-model="firstVal" @change="convertFirst"> 
        </div>
      </div>
      <b-icon-arrow-repeat class="icon-size" @click="swapCurr"></b-icon-arrow-repeat>
      <div class="converter-item">
        <select v-model="secondCurr" class="curr-list">
          <option disabled class="curr-list-item">{{secondCurr}}</option>
          <option v-for="curr in currList" :key="curr.abr" class="curr-list-item">
            <country-flag :country='curr.flag' size='small'/>
            {{curr.abr}}
          </option>
        </select>
        <div class="user-input" >
          <input type="number" class="user-input-text" v-model="secVal">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clist from '../json/clist.json'
import CountryFlag from 'vue-country-flag'

export default {
  mounted(){
    this.getCurr();
  },
  props: {
    selectedCurr: {
      type: String,
      required: true
    },
  },
  components: {
    CountryFlag,
  },
  data(){
    return{
      currList: clist.currency,
      firstCurr: this.selectedCurr,
      url : 'https://api.exchangeratesapi.io/latest',
      secondCurr: this.selectedCurr,
      apiData: null,
      currRates: null,
      firstVal: 1,
      secVal: null,
    }
  },
  methods: {
        changeBase(){
      this.$emit('changeBase',this.firstCurr);
    },
    swapCurr(){
      let temp = this.firstCurr;
      let tempTemp= temp;
      this.firstCurr = this.secondCurr;
      this.secondCurr = tempTemp;
      if(this.apiData.rates[this.secondCurr]==1){
      this.apiData.rates[this.secondCurr]=this.apiData.rates[this.secondCurr] /this.apiData.rates[this.firstCurr];
      }
    },

    async getCurr() {
      const response = await fetch(this.url+"?base="+this.selectedCurr);
      console.log(this.url+"?base="+this.selectedCurr);
      this.apiData = await response.json();
      //this.currRates = Object.keys(this.apiData.rates);
      this.getCurrKeynames();
      console.log(this.apiData);
    },
    getCurrKeynames(){
      this.currRates = Object.keys(this.apiData.rates);
    },
    sliceEnd(str){
       let strSpl = str.slice(0,-1);
      return strSpl.toLowerCase();
    },
    getKeysToObject(rateKey){
      return this.apiData.rates[rateKey].toFixed(2);
    },
    convertFirst(){
      this.secVal = this.firstVal*this.apiData.rates[this.secondCurr];
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.converter{
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  justify-items: center;
  align-items: center;

}
.converter-item{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
.icon-size{
  color:rgb(22, 128, 31);
  width: 12em;
  height: 12em;
}
.curr-list{
  width: 12em;
  height: 4em;
}
.curr-list-item{
  display: flex;
  flex-direction: row;
}
.curr-list-item-div{
  display: flex;
  justify-content: space-between;
}
.converter-row{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  background-color: rgba(42, 54, 70, 0.781);
}
.rates-list{
  flex-wrap: wrap;
  width: 100%;
  
}
.rates-list-item{
  width: 9%;
  background-color: rgba(180, 180, 180, 0.525);
}
.rates-list-item-top{
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  align-items: center;
  font-size: 1.3rem;
  color: aliceblue;
}
.rates-list-item-bot{
  font-size: 1.3rem;
  color: aliceblue;
}
.user-input{
  
}
.user-input-text{
  width: 12em;
  height: 4em;
  font-size: 1em;
}
</style>

