<template>
  <div class="container">
    <div class="badge-container">
      <InformationBadges />
    </div>
    <div>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item mirador__tab">
          <a class="nav-link" :class="{'active-tab active': activeTab === 'epic-tab'}" @click="changeActiveTab('epic-tab')">Epics</a>
        </li>
        <li class="nav-item mirador__tab">
          <a class="nav-link" :class="{'active-tab active': activeTab === 'other-label-tab'}" @click="changeActiveTab('other-label-tab')">OtherLabels</a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane":class="{'active': activeTab === 'epic-tab'}" role="tabpanel">
          <div>
            <a class="btn mirador__export-btn btn-success" :href="csvExport" download="epic.csv">
              <i class="fa fa-file-excel-o" aria-hidden="true"></i>
              Export in CSV</a>
          </div>
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
        <div class="tab-pane" :class="{'active': activeTab !== 'epic-tab'}" role="tabpanel">
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
  data: function() {
    return {
      activeTab: "epic-tab"
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
    },
    csvExport: function() {
      let csv = Object.keys(this.epics[0]).join() + "\n"
      this.epics.forEach((epic) => {
        csv += Object.values(epic) + "\n"
      })
      return 'data:text/csv;charset=utf-8,' + encodeURI(csv)
    }
  },
  methods: {
    changeActiveTab: function(activeTab) {
      activeTab === "epic-tab"
      ? this.activeTab = "epic-tab"
      : this.activeTab = "other-label-tab"
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
  padding-top: 15px;
}

.column__informations {
  display: flex;
  justify-content: space-between;
}

.column__informations__name {
  font-weight: bold;
}

.mirador__tab {
  flex: 1;
  text-align: center;
  color: black;
}

.column__informations__card-count {
  margin-left: 5px;
  font-style: italic;
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

.badge-container {
  padding: 20px 0;
}

.column__informations__complexity-progression {
  margin-left: 5px;
}
</style>
