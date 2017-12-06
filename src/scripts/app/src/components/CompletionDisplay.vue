<template>
  <div class="container">
    <div class="badge-container">
      <InformationBadges />
    </div>
    <div>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#epics" role="tab">Epics</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#otherLabels" role="tab">OtherLabels</a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" id="epics" role="tabpanel">
          <div class="epic__stats" v-for="epic in epics">
            <div class="label-container">
              <div class="column__informations py-2">
                <LabelDetails :label="epic" />
              </div>
              <CompletionRateBar
              :complexity="epic.complexity"
              :done-complexity="epic.doneComplexity"
              :total-complexity="epic.totalComplexity"
              :max-completion-bar-size="maxCompletionBarSize"
              />
            </div>
          </div>
        </div>
        <div class="tab-pane" id="otherLabels" role="tabpanel">
          <div class="epic__stats" v-for="label in otherLabels">
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
  computed: {
    maxCompletionBarSize: function() {
      return Math.max.apply(Math, this.labels.map(function(label)
      {
        return label.complexity
          ? Math.max(label.totalComplexity, label.complexity)
          : label.totalComplexity
      }))
    },
    epics: function() {
      return this.labels.filter(label => label.complexity)
    },
    otherLabels: function() {
      return this.labels.filter(label => !label.complexity)
    }
  }
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
  /*color: white;*/
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
