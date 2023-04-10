export default function ({ store, route, redirect }) {

    if ( !store.state.user.isLogin && route.path !== '/api/redirect' ) {
        return redirect( process.env.AUTH_LOGIN_REDIRECT );
    }
}