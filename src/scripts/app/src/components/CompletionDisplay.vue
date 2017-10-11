<template>
  <div class="container">
    <div class="badge-container">
      <InformationBadges />
    </div>
    <div class="epic__stats" v-for="label in labels">
      <div class="label-container">
        <div class="column__informations py-2">
          <LabelDetails :label="label" />
        </div>
        <CompletionRateBar :complexity="label.complexity" :done-complexity="label.doneComplexity" :total-complexity="label.totalComplexity" />
      </div>
    </div>
  </div>
</template>

<script>
import CompletionRateBar from './CompletionRateBar.vue'
import InformationBadges from './InformationBadges.vue'
import LabelDetails from './LabelDetails.vue'

export default {
  components: {
    CompletionRateBar,
    InformationBadges,
    LabelDetails
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
  padding: 15px 0;
}

.column__informations {
  display: flex;
  justify-content: space-between;
}

.column__informations__name {
  font-weight: bold;
  color: white;
}

.column__informations__card-count {
  margin-left: 5px;
  font-style: italic;
}

.label-container {
  padding: 5px 0;
  font-size: 13px;
}

.badge-container {
  padding: 20px 0;
}

.column__informations__complexity-progression {
  margin-left: 5px;
}
</style>
