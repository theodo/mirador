<template>
  <div class="column-selector__button btn btn-info btn-block" @click="callback">{{ title }}</div>
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
