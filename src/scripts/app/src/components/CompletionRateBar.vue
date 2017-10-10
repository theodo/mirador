  <template>
    <div>
      <div class="column__completion progress">
        <div class="column__completion__done progress-bar bg-success" role="progressbar" :style="grayBar" />
        <div class="column__completion__red-land progress-bar" role="progressbar" :style="blueBar" />
      </div>
      <div v-if="complexity" class="column__completion progress">
        <div class="column__completion__red-land progress-bar bg-dark" role="progressbar" :style="darkBar" />
        <div class="column__completion__red-land progress-bar bg-danger" role="progressbar" :style="redBar" />
      </div>
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
      totalComplexity: {
        type: Number,
        required: true,
      },
    },
    computed: {
      doneTotalRatio: function() {
        return (this.totalComplexity != 0
          ? this.doneComplexity/this.totalComplexity * 100
          : 0
        )
      },
      blueBar: function() {
        return ( this.complexity && this.totalComplexity < this.complexity
          ? { width: (this.totalComplexity/this.complexity * (100 - this.doneTotalRatio) ) + '%' }
          : { width: (100 - this.doneTotalRatio) + '%'}
        )
      },
      grayBar: function() {
        return ( this.complexity && this.totalComplexity < this.complexity
          ? { width: (this.doneComplexity/this.complexity) + '%' }
          : { width: (this.doneTotalRatio) + '%'}
        )
      },
      darkBar: function() {
        return (this.totalComplexity < this.complexity)
          ? { width: '100%' }
          : { width: ( this.complexity/this.totalComplexity * 100) + '%' }
      },
      redBar: function() {
        return ( this.doneComplexity > this.complexity
          ? { width: ((this.doneComplexity - this.complexity)/this.totalComplexity * 100) + '%' }
          : { width: '0%' }
        )
      },
    },
  }
</script>

<style>
.column__completion {
  display: flex;
}

.bg-dark {
  background-color: black;
}
</style>
