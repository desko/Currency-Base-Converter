<template>
  <div class="converter">
    <div class="container converter-row rates-list">
      <div v-for="curr in currRates" :key="curr" class="rates-list-item">
          <div class="rates-list-item-top">
            {{curr}}
            <country-flag :country='sliceEnd(curr)' size='normal'/>
          </div>
          <div class="rates-list-item-bot">

          </div>
      </div>
    </div>
    <div class="converter-row">
      <div class="converter-item">
        <select v-model="firstCurr" @change="changeBase" class="curr-list">
          <option disabled class="curr-list-item">{{firstCurr}}</option>
          <option v-for="curr in currList" :key="curr.abr" class="curr-list-item">
            <div class="curr-list-item-div">
              <country-flag :country='curr.flag' size='normal'/>
              {{curr.abr}}
            </div>
          </option>
        </select>
      </div>
      <b-icon-arrow-repeat class="icon-size" @click="swapCurr"></b-icon-arrow-repeat>
      <div class="converter-item">
        <select v-model="secondCurr" class="curr-list">
          <option disabled class="curr-list-item">{{selectedCurr}}</option>
          <option v-for="curr in currList" :key="curr.abr" class="curr-list-item">
            <country-flag :country='curr.flag' size='normal'/>
            {{curr.abr}}
          </option>
        </select>
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
      secondCurr: null,
      apiData: null,
      currRates: null,
    }
  },
  methods: {
    swapCurr(){
      let temp = this.firstCurr;
      this.firstCurr = this.secondCurr;
      this.secondCurr = temp;
    },
    changeBase(){
      this.$emit('changeBase',this.firstCurr);
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
      return strSpl;
    }
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

}
.icon-size{
  width: 12em;
  height: 12em;
}
.curr-list{
  width: 12em;
  height: 4em;
}
.curr-list-item{

}
.curr-list-item-div{
  display: flex;
  justify-content: space-between;
}
.converter-row{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  justify-items: center;
  align-items: center;
}
.rates-list{
  flex-wrap: wrap;
  width: 100%;
  
}
.rates-list-item{
  width: 9%;
}
.rates-list-item-top{
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  align-items: center;
}
</style>
