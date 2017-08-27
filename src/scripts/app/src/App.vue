<template>
  <div id="app">
    <div v-if="isBooted">
      <ColumnSelector :columns="columns" :doneColumns="doneColumns" @updateColumns="updateColumns" />
      <CompletionDisplay :labels="labels" />
    </div>
  </div>
</template>

<script>
import BoardFormatter from './services/BoardFormatter'
import ColumnSelector from './components/ColumnSelector.vue'
import CompletionDisplay from './components/CompletionDisplay.vue'

export default {
  name: 'app',
  components: {
    ColumnSelector,
    CompletionDisplay
  },
  data: function() {
    return {
      data: {},
      isBooted: false,
      labels: [],
      columns: [],
      doneColumns: [],
    }
  },
  mounted: function() {
    window.eventBus.$on('data-fetched', (data) => {
      this.data = data
      this.doneColumns = data.doneColumns
      this.labels = BoardFormatter.format(data, data.doneColumns)
      this.columns = BoardFormatter.extractColumns(data)
      this.isBooted = true
    })
  },
  methods: {
    updateColumns: function(columns) {
      this.doneColumns = columns
      this.labels = BoardFormatter.format(this.data, this.doneColumns)
    }
  }
}
</script>

<style>
#app {
  height: 500px;
  width: 500px;
  overflow-y: scroll;
  position: relative;
}

body {
  margin: 0;
}
</style>
