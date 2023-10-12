<template>
  <div class="wallet-pro">
    Building
  </div>
</template>
<script setup>
definePageMeta({
  layout: "main",
  middleware: 'auth'
})
useHead({
  title: 'Wallet Pro'
})

    import api from '~/api/api.js';
    let ret;
    
    ret = await api.wallet.list();
    
console.log(ret);
    
    let assetId = ret.data.asset[0].id;
    
console.log('assetId : ' + assetId);
    
    ret = await api.wallet.asset(assetId);

console.log(ret);

    ret = await api.wallet.balance(assetId);
console.log(ret);


</script>

<style lang="scss" scoped>

</style>