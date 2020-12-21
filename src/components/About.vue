<template>
    <div class="hmpg">
        <div class="wlcm ttl">Currency Base</div>
        <div class="wlcm nfo">This is a website developed for a university project by D. Dimitrov and V. Ivanov for the course PPI. It uses a <a href="https://exchangeratesapi.io/">API </a> for the information about currencies. Vue.js is the framework used for development and CSS/Bootsrap for styling.</div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.wlcm {
    color: rgb(255, 255, 255);
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
}
.hmpg{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.ttl{
    font-size: 550%;
}
.nfo{ 
    width: 80%;
    font-size: 250%;
}
@media only screen and (min-width: 280px) { 
.ttl{
    font-size: 350%;
}
.nfo{ 
    font-size: 150%;
}
}
@media only screen and (min-width: 760px) {
    .ttl{
    font-size: 400%;
    }
    .nfo{ 
    font-size: 200%;
    }
}
@media only screen and (min-width: 1000px) {
    .ttl{
    font-size: 550%;
}
.nfo{ 
    font-size: 250%;
}   
}
</style>