export const formFieldMixin = {
  inheritAttrs: false,

  props: {
    value: [String, Number],

    label: {
      type: String,
      default: ''
    }
  },

  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    }
  }
};
