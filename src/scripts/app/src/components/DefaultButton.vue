<template>
  <div class="column-selector__button btn mirador__default-button" @click="callback">{{ title }}</div>
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
    width: 100%;
    margin: 5px;
  }
</style>
