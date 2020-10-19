<template>
  <div class="converter">
    <div class="converter-row rates-list">
      <div v-for="curr in currRates" :key="curr" class="rates-list-item border">
          <div class="rates-list-item-top">
            {{curr}}
            <country-flag :country='sliceEnd(curr)' size='normal'/>
          </div>
          <div class="rates-list-item-bot">
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
        <input type="number" class="user-input-text" v-model="firstVal" @change="convertFirst"> 
      </div>
      <div class="converter-item">
        <b-icon-arrow-repeat class="icon-size" @click="swapCurr"></b-icon-arrow-repeat>
      </div>
      <div class="converter-item">
        <select v-model="secondCurr" class="curr-list">
          <option disabled class="curr-list-item">{{secondCurr}}</option>
          <option v-for="curr in currList" :key="curr.abr" class="curr-list-item">
            <country-flag :country='curr.flag' size='small'/>
            {{curr.abr}}
          </option>
        </select>
        <input type="number" class="user-input-text" v-model="secVal">
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
      this.firstCurr = this.secondCurr;
      this.secondCurr = temp;
      if(this.apiData.rates[this.secondCurr]==1){
      this.apiData.rates[this.secondCurr]=this.apiData.rates[this.secondCurr] /this.apiData.rates[this.firstCurr];
      }
      temp = this.firstVal;
      this.firstVal = this.secVal;
      this.secVal = temp;
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
  height: 80%;
  width: 80%;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  background-color: rgba(42, 54, 70, 0.781);
  border-radius: 25px;
}
.converter-row{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 25px;
}
.converter-item{
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
}
.icon-size{
  color:rgb(22, 128, 31);
  width: 50%;
  height: 50%;
}
.curr-list{
  width: 75%;
  height: 40%;
  border-radius: 25px 25px 0px 0px;
}
.curr-list-item{
  display: flex;
  flex-direction: row;
}
.curr-list-item-div{
  display: flex;
  justify-content: space-between;
}
.rates-list{
  flex-wrap: wrap;
  width: 100%;
  
}
.rates-list-item{
  width: 9%;
  background-color: rgba(180, 180, 180, 0.525);
  border-radius: 20% 20% 20% 20%;
  color: aliceblue;
}
.rates-list-item-top{
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  align-items: center;
  font-size: 1.3rem;
  border-radius: 20% 20% 0% 0%;
}
.rates-list-item-bot{
  font-size: 1.3rem;
  border-radius: 0% 0% 20% 20%;
}
.user-input{
  
}
.user-input-text{
  width: 75%;
  height: 40%;
  font-size: 100%;
  display: flex;
  justify-content: center;
  border-radius:  0px 0px 25px 25px;
}
</style>

