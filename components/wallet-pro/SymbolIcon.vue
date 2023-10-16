<template>
  <div>
    <img v-if="icon" :src="icon" v-bind="$attrs" class="rounded-circle" style="width: 20px;" />
    <slot v-else name="fallback"></slot>
  </div>
</template>

<script setup>
const usdc = './imgs/symbol/usdc_icon.svg'
const arb = './imgs/network/arbitrum.png'
const avax = './imgs/network/avalanche.png'
const bnb = './imgs/network/binance.png'
const btc = './imgs/network/bitcoin.png'
const eth = './imgs/network/ethereum.png'
const matic = './imgs/network/polygon.png'
const xlm = './imgs/network/stellar.png'
const trx = './imgs/network/tron.png'

const SYMBOL_ICON = {
  usdc,
  arb,
  avax,
  bnb,
  btc,
  eth,
  matic,
  xlm,
  trx
}

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})

const icon = computed(() => {
  const lowerCaseName = props.name?.toLowerCase()
  return SYMBOL_ICON[lowerCaseName]
})
</script>
