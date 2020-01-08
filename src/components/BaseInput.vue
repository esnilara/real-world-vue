<template>
  <div>
    <label v-if="label" :for="$attrs.id">{{ label }}</label>
    <input
      :value="value"
      v-bind="$attrs"
      @input="updateValue"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin.js';

export default {
  mixins: [formFieldMixin],

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      };
    }
  }
};
</script>

<style scoped></style>
