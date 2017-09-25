<template>
  <div class="column__completion progress">
    <div class="column__completion__done progress-bar" role="progressbar" :style="greenBar" />
    <div class="column__completion__red-land progress-bar bg-danger" role="progressbar" :style="redBar" />
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
        return (this.completionPercent >= 100) ? { width:10000/this.completionPercent+ '%' } : { width:this.completionPercent + '%' }
      },
      redBar: function() {
        return (this.completionPercent <= 100)
          ? { width:'0%' }
          : { width:((this.completionPercent - 100) / this.completionPercent) * 100 + '%' }
      },
    },
  }
</script>

<style>
.column__completion {
  display: flex;
}
</style>
