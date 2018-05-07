import VueRouter from 'vue-router';
import result from './components/result.vue';

const routes = [
    {
        path: '/result/:keyword',
        component: result,
    },
];

const router = new VueRouter({
    routes,
});

export {router};
