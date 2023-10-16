<template>
  <div>
    <img v-if="icon" :src="icon" v-bind="$attrs" class="rounded-circle" style="width: 20px;" />
    <slot v-else name="fallback"></slot>
  </div>
</template>

<script setup>
import usdc from '/imgs/symbol/usdc_icon.svg'
import arb from '/imgs/network/arbitrum.png'
import avax from '/imgs/network/avalanche.png'
import bnb from '/imgs/network/binance.png'
import btc from '/imgs/network/bitcoin.png'
import eth from '/imgs/network/ethereum.png'
import matic from '/imgs/network/polygon.png'
import xlm from '/imgs/network/stellar.png'
import trx from '/imgs/network/tron.png'

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
