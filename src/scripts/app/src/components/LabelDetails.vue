<template>
  <div style="display: flex;">
    <div class="column__informations__name btn-secondary btn">{{ this.label.title }}</div>
    <span class="column__informations__complexity-progression">
      <span class="mirador__done">{{ this.label.doneComplexity }}</span> /
      <span class="mirador__estim">{{
        (this.label.complexity)
        ? (this.label.complexity)
        : 0 }}
      </span> /
      <span class="mirador__total">
        {{ this.label.totalComplexity }}
      </span>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style>
.mirador__done {
  color: green;
}

.mirador__total {
  color: blue;
}

.mirador__estim {
  color: black;
}

.badge-dark {
  background-color: black;
}
</style>
