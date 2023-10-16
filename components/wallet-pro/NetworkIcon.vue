<template>
  <div>
    <img v-if="icon" :src="icon" v-bind="$attrs" class="rounded-circle" style="width: 20px;" />
    <slot v-else name="fallback"></slot>
  </div>
</template>

<script setup>
const arbitrum = './imgs/network/arbitrum.png'
const avalanche = './imgs/network/avalanche.png'
const binance = './imgs/network/binance.png'
const bitcoin = './imgs/network/bitcoin.png'
const ethereum = './imgs/network/ethereum.png'
const polygon = './imgs/network/polygon.png'
const stellar = './imgs/network/stellar.png'
const tron = './imgs/network/tron.png'

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