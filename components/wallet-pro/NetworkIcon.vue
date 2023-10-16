<template>
  <div>
    <img v-if="icon" :src="icon" v-bind="$attrs" class="rounded-circle" style="width: 20px;" />
    <slot v-else name="fallback"></slot>
  </div>
</template>

<script setup>
import arbitrum from '/imgs/network/arbitrum.png'
import avalanche from '/imgs/network/avalanche.png'
import binance from '/imgs/network/binance.png'
import bitcoin from '/imgs/network/bitcoin.png'
import ethereum from '/imgs/network/ethereum.png'
import polygon from '/imgs/network/polygon.png'
import stellar from '/imgs/network/stellar.png'
import tron from '/imgs/network/tron.png'

const NETWORK_ICON = {
  arbitrum,
  avalanche,
  binance,
  bitcoin,
  ethereum,
  polygon,
  stellar,
  tron
}

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})

const icon = computed(() => {
  const lowerCaseName = props.name?.toLowerCase()
  return NETWORK_ICON[lowerCaseName]
})

</script>