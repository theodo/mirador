<template>
  <ul>
    <li v-for="label in labels">{{ label.title }} - {{ label.value }}</li>
  </ul>
</template>

<script>
  export default {
    data: function() {
      return {labels: this.$attrs.labels}
    }
  }
</script>
