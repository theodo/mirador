<template>
  <div class="column-selector__button btn btn-info mirador__default-button" @click="callback">{{ title }}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    callback: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style>
  .mirador__default-button {
    margin: 5px;
  }
</style>
