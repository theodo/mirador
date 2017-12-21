<template>
  <div>
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item mirador__tab">
        <a
          class="nav-link"
          :class="{'active': activeTab === 'epic-tab'}"
          @click="changeActiveTab('epic-tab')"
        >
          Epics
        </a>
      </li>
      <li class="nav-item mirador__tab">
        <a
          class="nav-link"
          :class="{'active': activeTab !== 'epic-tab'}"
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
.mirador__tab {
  flex: 1;
  text-align: center;
  color: black;
}

.column__informations__complexity-progression {
  margin-left: 5px;
}
</style>
