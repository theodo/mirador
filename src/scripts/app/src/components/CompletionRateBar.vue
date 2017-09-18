<template>
  <div class="column__completion">
    <div class="column__completion__green-land" :style="orangeBar">
      <div class="column__completion__done" :style="greenBar" />
    </div>
    <div class="column__completion__red-land" :style="redBar" />
  </div>
</template>

<script>
  export default {
    props: {
      complexity: {
        type: Number,
        required: true,
      },
      doneComplexity: {
        type: Number,
        required: true,
      },
    },
    computed: {
      completionPercent: function () {
        return Math.round((this.doneComplexity / this.complexity) * 100)
      },
      greenBar: function() {
        return (this.completionPercent >= 100) ? { width: '100%' } : { width: this.completionPercent + '%' }
      },
      orangeBar: function() {
        return (this.completionPercent <= 100) ? { width: '100%' } : { width: (100 / this.completionPercent) * 100 + '%' }
      },
      redBar: function() {
        return (this.completionPercent <= 100)
          ? { width: '0%' }
          : { width: ((this.completionPercent - 100) / this.completionPercent) * 100 + '%' }
      },
    },
  }
</script>

<style>
.column__completion {
  display: flex;
}

.column__completion__green-land {
  height: 3px;
  background-color: #CACACA;
}

.column__completion__done {
  height: 3px;
  background-color: #00E676;
  width: 0;
}

.column__completion__red-land {
  height: 3px;
  background-color: red;
}
</style>
