<template>
  <div v-show="isActiveTab">
    <div class="tab-pane active">
      <div v-if="hasCsvExport">
        <a class="btn mirador__export-btn btn-success" :href="csvExport" download="epic.csv">
          <i class="fa fa-file-excel-o" aria-hidden="true"></i>
          Export in CSV
        </a>
      </div>
      <div v-if="labels.length === 0">
        <span>You don't have any {{labelType}} on your trello board.</span>
        <br>
        <span v-if="labelType === 'epics'">Start using smart labelling to display your epics in the mirador dashboard</span>
      </div>
      <div class="epic__stats" v-for="label in labels">
        <div class="label-container">
          <div class="column__informations py-2">
            <LabelDetails :label="label" />
          </div>
          <CompletionRateBar
            :complexity="label.complexity"
            :done-complexity="label.doneComplexity"
            :total-complexity="label.totalComplexity"
            :max-completion-bar-size="maxCompletionBarSize"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompletionRateBar from './CompletionRateBar.vue'
import LabelDetails from './LabelDetails.vue'
import csvComputer from '../services/csvComputer'

export default {
  components: {
    CompletionRateBar,
    LabelDetails,
  },
  props: {
    labelType: String,
    labels: {
      type: Array,
      default: function() {
        return []
      }
    },
    isActiveTab: Boolean,
    hasCsvExport: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    maxCompletionBarSize: function() {
      return Math.max.apply(Math, this.labels.map(function(label)
      {
        return label.complexity
          ? Math.max(label.totalComplexity, label.complexity)
          : label.totalComplexity
      }))
    },
    csvExport: function() {
      return csvComputer.getCsvDataFromLabels(this.labels)
    },
  }
}
</script>

<style>
.epic__stats {
  padding-top: 15px;
}

.column__informations {
  display: flex;
  justify-content: space-between;
}

.label-container {
  padding: 5px 0;
  font-size: 13px;
}

.mirador__export-btn {
  margin-top: 15px;
  position: absolute;
  right: 0;
}
</style>
