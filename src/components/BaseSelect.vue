<template>
  <div>
    <label v-if="label" :for="$attrs.id">{{ label }}</label>

    <select :value="value" v-bind="$attrs" @change="updateValue">
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin.js';

export default {
  mixins: [formFieldMixin],

  props: {
    options: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped></style>
