<template>
    <div class="hmpg">
        <div class="wlcm ttl">Welcome to Currency Base</div>
        <div class="wlcm nfo">The site to go to for exact currency exchange.<br>To get started, please select a currency you wish to get results for.</div>
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
}
.ttl{
    font-size: 550%;
}
.nfo{ 
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