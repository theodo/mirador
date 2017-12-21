<template>
  <div>
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{'active': activeTab === 'epic-tab'}"
          data-toggle="tab"
          href="#epics"
          role="tab"
          @click="changeActiveTab('epic-tab')"
        >
          Epics
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{'active': activeTab !== 'epic-tab'}"
          data-toggle="tab"
          href="#otherLabels"
          role="tab"
          @click="changeActiveTab('other-label-tab')"
        >
          OtherLabels
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <LabelsTab
        :labels="epics"
        :is-active-tab="activeTab === 'epic-tab'"
      />
      <LabelsTab
        :labels="otherLabels"
        :is-active-tab="activeTab === 'other-label-tab'"
      />
    </div>
  </div>
</template>

<script>
import LabelsTab from './LabelsTab.vue'

export default {
  components: {
    LabelsTab
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
    epics: function() {
      return this.labels.filter(label => label.complexity)
    },
    otherLabels: function() {
      return this.labels.filter(label => !label.complexity)
    },
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

.column__informations__complexity-progression {
  margin-left: 5px;
}
</style>
