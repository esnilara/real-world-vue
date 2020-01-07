import Vue from 'vue';
import VueRouter from 'vue-router';
import EventList from '@/views/EventList.vue';
import NProgress from 'nprogress';
import store from '@/store/index.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: () =>
      import(/* webpackChunkName: "event-create" */ '../views/EventCreate.vue')
  },
  {
    path: '/event/:id',
    name: 'event-show',
    props: true,

    async beforeEnter(routeTo, routeFrom, next) {
      const event = await store.dispatch('event/fetchEvent', routeTo.params.id);
      routeTo.params.event = event;
      next();
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "event-show" */ '../views/EventShow.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
