
export default defineNuxtRouteMiddleware(async (to, from) => {
    
    if ( !process.client) return;
    
    const AuthStore = useAuthStore();

    if ( !AuthStore.loggedIn ) {
        
        const cfg = useRuntimeConfig()
   
        await navigateTo(cfg.public.authRedirect, {
            external: true
        });
    }
    
})