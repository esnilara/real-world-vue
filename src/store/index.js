import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 'abc123',
      name: 'Adam Jahr'
    },

    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],

    events: [],
    event: {},
    eventsTotal: 0,
    perPage: 3
  },

  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },

    SET_EVENTS(state, events) {
      state.events = events;
    },

    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal;
    },

    SET_EVENT(state, event) {
      state.event = event;
    }
  },

  actions: {
    async createEvent({ commit }, event) {
      try {
        await EventService.postEvent(event);
        commit('ADD_EVENT', event);
      } catch (error) {
        throw error;
      }
    },

    async fetchEvents({ commit, state }, { page }) {
      try {
        const response = await EventService.getEvents(state.perPage, page);
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']));
        commit('SET_EVENTS', response.data);
      } catch (error) {
        throw error;
      }
    },

    async fetchEvent({ commit, getters }, id) {
      try {
        const event = getters.getEventById(id);

        if (event) {
          commit('SET_EVENT', event);
        } else {
          const response = await EventService.getEvent(id);
          commit('SET_EVENT', response.data);
        }
      } catch (error) {
        throw error;
      }
    }
  },

  modules: {},

  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id);
    }
  }
});
