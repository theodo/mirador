<template>
  <div v-if="isActiveTab">
    <div class="tab-pane active">
      <div v-if="hasCsvExport">
        <a class="btn mirador__export-btn btn-success" :href="csvExport" download="epic.csv">
          <i class="fa fa-file-excel-o" aria-hidden="true"></i>
          Export in CSV
        </a>
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

export default {
  components: {
    CompletionRateBar,
    LabelDetails,
  },
  props: {
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
      let csv = Object.keys(this.labels[0]).join() + "\n"
      this.labels.forEach((epic) => {
        csv += Object.values(epic) + "\n"
      })
      return 'data:text/csv;charset=utf-8,' + encodeURI(csv)
    }
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
