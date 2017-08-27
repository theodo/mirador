<template>
  <div id="app">
    <div v-if="isBooted">
      <CompletionDisplay :labels="labels" />
    </div>
  </div>
</template>

<script>
import BoardFormatter from './services/BoardFormatter'
import CompletionDisplay from './components/CompletionDisplay.vue'

export default {
  name: 'app',
  components: {
    CompletionDisplay
  },
  data: function() {
    return {
      isBooted: false,
      labels: [],
      columns: ['list1', 'list2', 'list3', 'list4'],
      doneColumns: [],
    }
  },
  mounted: function() {
    window.eventBus.$on('data-fetched', (data) => {
      this.isBooted = true
      this.labels = BoardFormatter.format(data)
    })
  }
}
</script>

<style>
#app {
  height: 500px;
  width: 500px;
  overflow-y: scroll;
}
</style>
