<template>
  <div>
    <h1>Create an Event</h1>

    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        id="category"
        :options="categories"
        v-model="event.category"
        class="field"
      />

      <h3>Name & describe your event</h3>

      <BaseInput
        type="text"
        label="Title"
        id="title"
        placeholder="Add an event title"
        v-model="event.title"
        class="field"
      />

      <BaseInput
        type="text"
        label="Description"
        id="description"
        placeholder="Add a description"
        v-model="event.description"
        class="field"
      />

      <h3>Where is your event?</h3>

      <BaseInput
        type="text"
        label="Location"
        id="location"
        placeholder="Add a location"
        v-model="event.location"
        class="field"
      />

      <h3>When is your event?</h3>

      <div class="field">
        <label for="date">Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          id="date"
        />
      </div>

      <BaseSelect
        label="Select a time"
        id="time"
        :options="times"
        v-model="event.time"
        class="field"
      />

      <BaseButton type="submit" buttonClass="-fill-gradient">
        Submit
      </BaseButton>
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
