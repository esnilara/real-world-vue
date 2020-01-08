<template>
  <div>
    <h1>Create an Event</h1>

    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        id="category"
        :options="categories"
        v-model="event.category"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />

      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>

      <h3>Name & describe your event</h3>

      <BaseInput
        type="text"
        label="Title"
        id="title"
        placeholder="Add an event title"
        v-model="event.title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />

      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>

      <BaseInput
        type="text"
        label="Description"
        id="description"
        placeholder="Add a description"
        v-model="event.description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />

      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required.
        </p>
      </template>

      <h3>Where is your event?</h3>

      <BaseInput
        type="text"
        label="Location"
        id="location"
        placeholder="Add a location"
        v-model="event.location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />

      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label for="date">Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          id="date"
          @opened="$v.event.date.$touch()"
        />
      </div>

      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>

      <BaseSelect
        label="Select a time"
        id="time"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />

      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>

      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
      >
        Submit
      </BaseButton>

      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import NProgress from 'nprogress';
import { required } from 'vuelidate/lib/validators';

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

  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },

  methods: {
    async createEvent() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
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
      }
    },

    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id,
        organizer: user,
        category: '',
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
