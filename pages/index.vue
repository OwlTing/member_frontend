<template>
    <div></div>
</template>

<script>

import api from '~/api/api';

export default {
    layout: 'plain',
    data() {
        return {};
    },

    created() {
        this.$router.push({name: 'profile-show'});
    }

}
</script>
