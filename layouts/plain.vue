<template>
    <div>
        <b-navbar variant="light">
            <b-navbar-brand href="/">
                <b-img src="imgs/owlting_logo.svg" fluid></b-img>
            </b-navbar-brand>
            
            <b-navbar-nav class="ms-auto">
                <b-nav-item>
                    <b-avatar variant="info" :src="profile.avatar"/>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>

        <Nuxt />
    </div>
</template>


<script>

export default {
    computed: {
        profile () {
            return this.$store.state.user.profile;
        }
    },
}

</script>

