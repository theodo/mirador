<template>
  <div>
    <div class="column" v-for="label in labels">
      <div class="column__informations">
        <div class="column__informations__name">{{ label.title }}</div>
        <span class="column__informations__complexity-progression">{{ label.doneComplexity }} / {{ label.complexity }} pts</span>
        <span class="column__informations__card-count">({{ label.cards }} cards)</span>
      </div>
      <div class="column__completion">
        <div class="column__completion__done" :style="computeLabelStyle(label)" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      labels: {
        type: Array,
        default: []
      }
    },
    methods: {
      computeLabelStyle: function(label) {
        console.log()
        return {
          width: Math.round((label.doneComplexity / label.complexity) * 100) + '%',
        }
      }
    }
  }
</script>

<style>
.column {
  margin: 2px;
  padding: 2px;
}

.column__informations {
  display: flex;
}

.column__informations__name {
  font-weight: bold;
}

.column__informations__card-count {
  margin-left: 5px;
  font-style: italic;
}

.column__informations__complexity-progression {
  margin-left: 5px;
}

.column__completion {
  height: 3px;
  background-color: #FBC02D;
}

.column__completion__done {
  height: 3px;
  background-color: #00E676;
  width: 0;
}
</style>
