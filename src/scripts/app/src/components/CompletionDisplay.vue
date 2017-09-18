<template>
  <div>
    <div class="epic__stats" v-for="label in labels">
      <div class="column__informations">
        <div style="display: flex;">
          <div class="column__informations__name">{{ label.title }}</div>
          <span class="column__informations__complexity-progression">{{ label.doneComplexity }} / {{ label.complexity }} pts</span>
        </div>
        <span class="column__informations__card-count">({{ label.cards }} cards)</span>
      </div>
      <CompletionRateBar :complexity="label.complexity" :done-complexity="label.doneComplexity" />
    </div>
  </div>
</template>

<script>
import CompletionRateBar from './CompletionRateBar.vue'

export default {
  components: {
    CompletionRateBar
  },
  props: {
    labels: {
      type: Array,
      default: []
    }
  },
}
</script>

<style>
.column {
  margin: 2px;
  padding: 2px;
}

.epic__stats {
  margin-bottom: 5px;
}

.column__informations {
  display: flex;
  justify-content: space-between;
}

.column__informations__name {
  font-weight: bold;
}

.column__informations__card-count {
  margin-left: 5px;
  font-style: italic;
}

.column__informations__complexity-progression {
  margin-left: 5px;
}
</style>
