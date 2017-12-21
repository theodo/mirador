<template>
  <div class="container">
    <div class="badge-container">
      <InformationBadges />
    </div>
    <LabelsTabs
      :labels="labels"
    />
  </div>
</template>

<script>
import InformationBadges from './InformationBadges.vue'
import LabelsTabs from './LabelsTabs.vue'

export default {
  components: {
    InformationBadges,
    LabelsTabs
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
