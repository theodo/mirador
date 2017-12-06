  <template>
    <div>
      <div class="column__completion progress-bar-border progression-bar-position" :style="completionBarSize">
        <div class="progress-bar-cursor" v-if="shouldCursorBeVisible" :style="cursor"></div>
        <div class="column__completion__red-land progress-bar bg-white  progress-white-bar-border" role="progressbar" :style="whiteBar" />
        <div class="column__completion__red-land progress-bar bg-danger" role="progressbar" :style="redBar" />
        <div class="column__completion__red-land progress-bar bg-warning" role="progressbar" :style="orangeBar" />
        <div class="column__completion__done progress-bar bg-success" role="progressbar" :style="greenBar" />
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
      maxCompletionBarSize: {
        type: Number,
        required: true
      }
    },
    computed: {
      isEpicOver: function() {
        return (this.complexity && this.doneComplexity > 0 && this.totalComplexity === this.doneComplexity)
      },
      shouldCursorBeVisible: function() {
        return !(this.doneComplexity === 0 || this.totalComplexity === this.doneComplexity)
      },
      whiteBar: function() {
        return (this.complexity && !this.isEpicOver
          ? { width: (this.complexity < this.totalComplexity
            ? (this.complexity*100/this.totalComplexity)
            : 100) + '%'}
          : { width: '0%'}
        )
      },
      orangeBar: function() {
        return (this.complexity
          ? { width: (this.complexity < this.totalComplexity
            ? (100 - this.complexity*100/this.totalComplexity - this.overEstimationRatio)
            : 0) + '%'}
          : { width: '100%'}
        )
      },
      greenBar: function() {
        return this.isEpicOver ? { width: '100%'} : { width: '0%'}
      },
      cursor: function() {
        return { marginLeft: (this.doneComplexity*100/this.totalComplexity) + '%' }
      },
      overEstimationRatio: function() {
        return (this.complexity && this.doneComplexity > this.complexity
          ? (this.doneComplexity - this.complexity)*100/this.totalComplexity
          : 0
        )
      },
      redBar: function() {
        return { width: this.overEstimationRatio + '%' }
      },
      completionBarSize: function() {
        return this.complexity
          ? {width: Math.max(this.totalComplexity, this.complexity)*100/this.maxCompletionBarSize + '%'}
          : {width: this.totalComplexity*100/this.maxCompletionBarSize + '%'}
      }
    },
  }
</script>

<style>
.column__completion {
  display: flex;
}

.progression-bar-position {
  position: relative;
}

.progress-bar-cursor {
  background-color: black;
  border-radius: .25rem;
  position: absolute;
  width: 2px;
  height: 17px;
}

.progress-bar-border {
  border: 1px solid transparent;
  border-color: lightgrey;
  border-radius: .25rem;
}

.progress-white-bar-border {
  border: 1px solid transparent;
  border-color: lightgrey;
  border-radius: .25rem;
}

.bg-white {
  background-color: white;
}
</style>
