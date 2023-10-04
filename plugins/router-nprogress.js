import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
    easing: 'ease-in',
    speed: 500,
    showSpinner: true,
    trickleSpeed: 200,
    minimum: 0.4
});

export default defineNuxtPlugin(() => {
    
    useRouter().beforeEach(() => {
        NProgress.start();
    });

    useRouter().afterEach(() => {
        NProgress.done();
    });
})
