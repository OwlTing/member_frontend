<template>
  <div class="asset-card card-bg-color position-relative rounded-3 pt-1 overflow-hidden px-0 font-monospace">
    <div class="position-relative bg-white pb-3 pt-1 px-3 rounded-3" :class="props.bodyClass">

      <div class="position-absolute end-0 card-color z-10" style="top: -1px; border-bottom-left-radius: 8px; border-top-right-radius: 8px;">
        <div class="d-flex align-items-center gap-1 text-white px-2 pb-1">
          <WalletProNetworkIcon :name="props.asset?.chain" />
          <span class="text-capitalize">{{ props.asset?.chain }}</span>
        </div>
      </div>

      <div>
        <div class="d-flex align-items-center gap-1 mb-2">
          <WalletProSymbolIcon :name="props.asset?.symbol" />
          <span class="text-primary-emphasis fw-medium text-uppercase">{{ props.asset?.symbol }}</span>
        </div>

        <div class="px-1 overflow-y-hidden d-flex align-items-center text-white rounded-1" id="tooltip" role="button" @click="handleCopy"
          style="white-space: nowrap; text-overflow: ellipsis; width: fit-content; background: #85A6CC;">
          <div>{{ truncateText(props.asset?.address) }}</div>
          <Icon name="fa:copy" class="ms-1 text-white" height="20px" />
        </div>
        <b-tooltip target="tooltip">{{ props.asset?.address }}</b-tooltip>

        <div class="mt-1">
          <div class="text-primary-emphasis fw-bold fs-1 mw-100">
            <span>{{ Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(props.asset?.balance) }}</span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script setup>
const commonStore = useCommonStore()
const props = defineProps({
  color: {
    type: String,
    default: '#bfbfbf'
  },
  bodyClass: {
    type: [Object, String, undefined],
    default: undefined
  },
  asset: {
    type: Object,
    default: {}
  }
})

const handleCopy = () => {
  try {
    const tempTextarea = document.createElement('textarea')
    tempTextarea.value = props.asset.address
    document.body.appendChild(tempTextarea)
    tempTextarea.select()
    document.execCommand('copy')
    document.body.removeChild(tempTextarea)

    commonStore.setCopyShow(true)
    setTimeout(() => {
      commonStore.setCopyShow(false)
    }, 1000)

  } catch(error) {
    console.log('Copy error', error)
  }
}

</script>
<style lang="scss" scoped>
.card-bg-color {
  background-image: linear-gradient(v-bind(color), v-bind(color) 10%, white 10%);
}
.card-color {
  background-color: v-bind(color);
}
</style>
