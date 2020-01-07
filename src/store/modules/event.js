import EventService from '@/services/EventService.js';

export const namespaced = true;

export const state = {
  events: [],
  event: {},
  eventsTotal: 0,
  perPage: 3
};

export const mutations = {
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
};

export const actions = {
  async createEvent({ commit, dispatch }, event) {
    try {
      await EventService.postEvent(event);
      commit('ADD_EVENT', event);

      const notification = {
        type: 'success',
        message: 'Your event has been created!'
      };

      dispatch('notification/add', notification, { root: true });
    } catch (error) {
      const notification = {
        type: 'error',
        message: `There was a problem creating the event: ${error.message}`
      };

      dispatch('notification/add', notification, { root: true });

      throw error;
    }
  },

  async fetchEvents({ commit, state, dispatch }, { page }) {
    try {
      const response = await EventService.getEvents(state.perPage, page);
      commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']));
      commit('SET_EVENTS', response.data);
    } catch (error) {
      const notification = {
        type: 'error',
        message: `There was a problem fetching events: ${error.message}`
      };

      dispatch('notification/add', notification, { root: true });
    }
  },

  async fetchEvent({ commit, getters, dispatch }, id) {
    try {
      const event = getters.getEventById(id);

      if (event) {
        commit('SET_EVENT', event);
      } else {
        const response = await EventService.getEvent(id);
        commit('SET_EVENT', response.data);
      }
    } catch (error) {
      const notification = {
        type: 'error',
        message: `There was a problem fetching event: ${error.message}`
      };

      dispatch('notification/add', notification, { root: true });
    }
  }
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
