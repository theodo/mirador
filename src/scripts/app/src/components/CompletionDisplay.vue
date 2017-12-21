<template>
  <div class="container">
    <div class="badge-container">
      <InformationBadges />
    </div>
    <LabelTab
      :labels="labels"
    />
  </div>
</template>

<script>
import InformationBadges from './InformationBadges.vue'
import LabelTab from './LabelTab.vue'

export default {
  components: {
    InformationBadges,
    LabelTab
  },
  props: {
    labels: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style>
.badge-container {
  padding: 20px 0;
}
</style>
