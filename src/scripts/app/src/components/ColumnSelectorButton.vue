<template>
  <DefaultButton :title="selectorTitle" :callback="open" />
</template>

<script>
import DefaultButton from './DefaultButton.vue'

export default {
  components: {
    DefaultButton,
  },
  props: {
    selectedColumnsNumber: {
      type: Number,
      required: true,
    },
    opened: {
      type: Boolean,
      required: true,
    },
    open: {
      type: Function,
      required: true,
    }
  },
  computed: {
    selectorTitle: function() {
      if (this.opened) {
        return (this.selectedColumnsNumber > 0)
          ? `Validate (${this.selectedColumnsNumber})`
          : 'Select Done Columns'
      }
      return (this.selectedColumnsNumber > 0)
        ? this.selectedColumnsNumber + ' columns selected'
        : 'Select Done Columns'
    },
  },
}
</script>
