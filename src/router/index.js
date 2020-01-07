import Vue from 'vue';
import VueRouter from 'vue-router';
import EventList from '@/views/EventList.vue';
import NotFound from '@/views/NotFound.vue';
import NetworkIssue from '@/views/NetworkIssue';
import NProgress from 'nprogress';
import store from '@/store/index.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
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
      try {
        const event = await store.dispatch(
          'event/fetchEvent',
          routeTo.params.id
        );

        routeTo.params.event = event;
        next();
      } catch (error) {
        if (error.response && error.response.status == 404) {
          next({ name: '404', params: { resource: 'event' } });
        } else {
          next({ name: 'network-issue' });
        }
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "event-show" */ '../views/EventShow.vue')
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
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
