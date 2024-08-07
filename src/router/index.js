import {createRouter, createWebHistory} from 'vue-router';
// import HomeComponent from '@/components/HomeComponent.vue';
import { memberRouter } from './memberRouter';
import { productRouter } from './productRouter';
import { orderRouter } from './orderRouter';

const routes = [
    // {
    //     path: '/',
    //     name: 'HomeComponent',
    //     component: HomeComponent
    // },
    ...memberRouter,
    ...productRouter,
    ...orderRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;