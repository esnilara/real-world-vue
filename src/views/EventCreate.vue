<template>
  <div>
    <h1>Create an Event</h1>

    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="category in categories" :key="category">
          {{ category }}
        </option>
      </select>

      <h3>Name & describe your event</h3>

      <div class="field">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>

      <div class="field">
        <label for="description">Description</label>
        <input
          id="description"
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>

      <h3>Where is your event?</h3>

      <div class="field">
        <label for="location">Location</label>
        <input
          id="location"
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>

      <h3>When is your event?</h3>

      <div class="field">
        <label for="date">Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          id="date"
        />
      </div>

      <div class="field">
        <label for="time">Select a time</label>
        <select v-model="event.time" name="time" id="time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import NProgress from 'nprogress';

export default {
  components: {
    Datepicker
  },

  data() {
    const times = [];

    for (let i = 1; i <= 24; i++) {
      times.push(`${i}:00`);
    }

    return {
      event: this.createFreshEventObject(),
      times,
      categories: this.$store.state.categories
    };
  },

  methods: {
    async createEvent() {
      try {
        NProgress.start();

        await this.$store.dispatch('event/createEvent', this.event);

        this.$router.push({
          name: 'event-show',
          params: { id: this.event.id }
        });

        this.event = this.createFreshEventObject();
      } catch (error) {
        NProgress.stop();
      }
    },

    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      };
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
