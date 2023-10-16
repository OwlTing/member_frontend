<template>
  <div class="wallet-pro position-relative" id="layout-reservation">
    <BContainer>
      <BCard>
        <BCardTitle class="clearfix">
          <span>Wallet Pro</span>
        </BCardTitle>
        <div class="row row-cols-1 row-cols-md-2 g-2">
          <div class="col" v-for="asset in assets" :key="`assets-${asset.address}`">
            <WalletProAssetCard
              class="shadow"
              :asset="asset"
              bodyClass="h-100"
              :color="getAssetCardColor(asset.chain)"
            />
          </div>
          <div v-if="isLoadingAssets">
            loading...
          </div>
          <div v-else-if="!isLoadingAssets && !assets.length">
            暫無資料
          </div>
        </div>
      </BCard>
    </BContainer>
    <div v-if="copyShow" class="position-absolute d-flex align-items-center justify-content-center w-100" style="transition: all .5s; top: 5px;">
      <div class="d-flex align-items-center rounded-3 py-1 px-2 bg-light-subtle shadow" style="width: fit-content;">
        <Icon name="fa:check-circle" class="me-1 text-success" />
        <span>Copied</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import api from '~/api/api.js'
import AssetCardColor from './AssetCardColor.js'
definePageMeta({
  layout: "main",
  middleware: 'auth'
})
useHead({
  title: 'Wallet Pro'
})

const commonStore = useCommonStore()
const copyShow = computed(() => commonStore.getCopyShow)
const isLoadingAssets = ref(false)
let data = ref([])

const assets = computed(() => data.value || [])

const fetchAssets = async () => {
  isLoadingAssets.value = true
  api.wallet.list()
    .then(res => {
      if (res.status) {
        data.value = res.data?.asset
        data.value.map(e => {
          api.wallet.asset(e.id)
            .then(res => {
              if (res.status) {
                e.balance = res.data?.asset?.balance
              }
            })
        })
      }
    })
    .finally(() => isLoadingAssets.value = false)
  }

const getAssetCardColor = (chain) => {
  return AssetCardColor[chain] || '#bfbfbf'
}

onMounted(async () => {
  await fetchAssets()
})
</script>

<style lang="scss" scoped>

</style>