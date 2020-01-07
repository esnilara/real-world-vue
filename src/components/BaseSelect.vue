<template>
  <div>
    <label v-if="label" :for="$attrs.id">{{ label }}</label>

    <select
      :value="value"
      v-bind="$attrs"
      @input="updateValue"
      v-on="$listeners"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    value: [String, Number],

    label: {
      type: String,
      default: ''
    },

    options: {
      type: Array,
      required: true
    }
  },

  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    }
  }
};
</script>

<style scoped></style>
