<template>
    <ul class="reservationBox list-unstyled">
        <li v-for="(itm1, key1) in reservation" :key="key1">
            <div style="font-size:1.3rem"><strong>{{ $t('reservation.info') }}</strong></div>

            <div v-for="(itm2, key2) in itm1.orders" :key="key2" class="itemBox mt-3 mb-4">
                <div>
                    <div class="mb-2">
                        <div class="title">
                            <i style="font-size:12px">No.</i> <span style="font-size:16px">{{ itm2.order_serial }}</span>
                        </div>
                    </div>

                    <ol class="list-unstyled">
                        <li v-for="(itm3, key3) in itm2.items" :key="key3">
                           <BContainer fluid>
                                <BRow>
                                    <BCol md="2" sm="2" xs="12" class="d-sm-none d-md-block">
                                        <NuxtLink :to="itm3.url" target="_blank">
                                            <BImg :src="itm3.image_url" />
                                        </NuxtLink>
                                    </BCol>

                                    <BCol md="7" sm="8" xs="12">
                                        <div class="productionBox" style="font-size:14px">
                                            <div class="title">
                                                <NuxtLink v-if="itm3.url" :to="itm3.url" target="_blank">{{ itm3.name }}</NuxtLink>
                                                <span v-else>{{ itm3.name }}</span>
                                            </div>
                                            <div class="vendor mt-1">
                                                <template v-if="itm2.vendor.url">
                                                    <NuxtLink :to="itm2.vendor.url" target="_blank">
                                                        <span class="me-1">
                                                            <Icon name="fa:link" width="12" height="12" />
                                                        </span>
                                                        <span>{{ $t('reservation.vendor') }}: {{ itm2.vendor.name }}</span>
                                                    </NuxtLink>
                                                </template>
                                                <template v-else>
                                                    <span>{{ $t('reservation.vendor') }}: {{ itm2.vendor.name }}</span>
                                                </template>
                                            </div>
                                        </div>
                                    </BCol>
                                    <BCol md="3" sm="4" xs="12">
                                        <div class="text-end">
                                            <div class="price" style="font-weight:bold">{{ itm1.currency }} {{ itm3.price }}</div>
                                            <div class="mt-1 text-danger" style="font-size:14px" v-if="itm1.discount > 0">{{ $t('reservation.discount') }}: -{{ itm3.discount }}</div>
                                            <div class="mt-1" style="font-size:12px">{{ $t('reservation.count') }}: {{ itm3.count }}</div>
                                        </div>
                                    </BCol>
                               </BRow>
                            </BContainer>
                        </li>
                    </ol>
                </div>
            </div>

            <BContainer fluid class="mt-3 py-2" style="border-top:1px solid #ccc">
                <BRow>
                    <BCol>
                        <div><span style="font-size:12px">{{ $t('reservation.payment') }}:</span> {{ itm1.payment_name }}</div>
                        <div style="font-size:12px; color:#1a1a1a" class="mt-1">{{ $t('m.created_at') }}: {{ $dayjs(itm1.created_at).format('YYYY-MM-DD HH:mm') }}</div>
                    </BCol>
                    <BCol class="text-end">
                        <div>
                            <span style="font-size:12px" class="me-2">{{ $t('reservation.amount') }}</span>
                            <span class="price" style="font-size:20px; font-weight:bold">{{ itm1.currency }} {{ itm1.amount }}</span>
                        </div>
                        <div class="mt-1 text-danger" style="font-size:14px" v-if="itm1.discount > 0">
                            {{ $t('reservation.discount') }}: -{{ itm1.discount }}
                        </div>
                    </BCol>
               </BRow>
            </BContainer>
        </li>
    </ul>
</template>

<script setup>

    const props = defineProps({
        reservation: {
            type: Object,
            required: true,
        },
        meta: {
            type: Object,
            required: true,
        },
    });

    const reservation   = reactive(props.reservation);
    const meta          = reactive(props.meta);

</script>

<style scoped>

    #layout-reservation .reservationBox {}
    #layout-reservation .reservationBox li:hover {border-radius:8px; background:#f6f6f6}

    #layout-reservation .reservationBox img {opacity:.8; border-radius:6px}
    #layout-reservation .reservationBox img:hover {opacity:1; border-color:#333;}

    #layout-reservation .reservationBox > li {padding:20px 20px 10px 20px}
    #layout-reservation .reservationBox li + li {margin-top:60px}

    #layout-reservation .reservationBox .itemBox  {}

    #layout-reservation .reservationBox .productionBox {font-size:14px; color:#1a1a1a}
    #layout-reservation .reservationBox .productionBox .title  {font-weight:bold;}

    #layout-reservation .reservationBox a:link      {color:#1a1a1a; text-decoration:none}
    #layout-reservation .reservationBox a:visited   {color:#1a1a1a}
    #layout-reservation .reservationBox a:hover     {color:#999}
</style>