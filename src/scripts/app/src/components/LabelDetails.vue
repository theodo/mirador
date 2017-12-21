<template>
  <div style="display: flex;">
    <div class="column__informations__name btn-secondary btn">
      {{ this.label.title }}
    </div>
    <div>
      <div class="column__informations__complexity-progression">
        <span class="mirador__done">{{ this.label.doneComplexity }}</span> /
        <span class="mirador__estim">{{
          (this.label.complexity)
          ? (this.label.complexity)
          : 0 }}
        </span> /
        <span class="mirador__total">
          {{ this.label.totalComplexity }}
        </span> /
        <span class="mirador__danger">{{
          (this.label.complexity && this.label.complexity < this.label.doneComplexity)
          ? this.label.doneComplexity - this.label.complexity
          : 0 }}
        </span>
      </div>
      <div class="column__informations__card-count">({{ label.cards }} cards)</div>
    </div>
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
.column__informations__name {
  font-weight: bold;
}

.column__informations__card-count {
  margin-left: 5px;
  font-style: italic;
}

.mirador__done {
  color: green;
}

.mirador__total {
  color: blue;
}

.mirador__estim {
  color: black;
}

.mirador__danger {
  color: red;
}

.badge-dark {
  background-color: black;
}
</style>
