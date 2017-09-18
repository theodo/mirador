<template>
  <div class="column-selector__button" @click="callback">{{ title }}</div>
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
.column-selector__button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #4FC3F7;
  height: 30px;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 5px;
}
</style>
