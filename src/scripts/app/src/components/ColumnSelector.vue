<template>
  <div class="column-selector">
    <div>
      <div class="container">
          <DefaultButton
            class="btn btn-secondary"
            :callback="openFeedbackForm"
            :title="'Give us feedback'"
          >
          </DefaultButton>
          <ColumnSelectorButton
            class="btn btn-success"
            :selected-columns-number="this.selectedColumns.length"
            :opened="isOpen"
            :open="openColumnSelector"
          />
          <ul v-if="isOpen" class="column-selector__list list-group">
            <li
            v-for="column in columns"
            @click="selectColumn(column)"
            :class="{'active': selectedColumns.includes(column)}"
            class="column-selector__list__item list-group-item"
            >
            {{ column }}
          </li>
        </ul>
        <ColumnSelectorButton
        v-if="isOpen"
        class="btn btn-success"
        :open="openColumnSelector"
        :opened="isOpen"
        :selected-columns-number="this.selectedColumns.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ColumnSelectorButton from './ColumnSelectorButton.vue'
import DefaultButton from './DefaultButton.vue'

export default {
  components: {
    ColumnSelectorButton,
    DefaultButton,
  },
  props: {
    columns: {
      type: Array,
      default: [],
    },
    doneColumns: {
      type: Array,
      default: [],
    }
  },
  data: function() {
    return {
      isOpen: false,
      selectedColumns: [],
    }
  },
  mounted: function() {
    this.selectedColumns = this.doneColumns.filter((column) => {
      return this.columns.includes(column)
    })
  },
  methods: {
    openColumnSelector: function() {
      this.isOpen = !this.isOpen
      if (!this.isOpen) {
        this.$emit('updateColumns', this.selectedColumns)
        window.eventBus.$emit('persistDoneColumn', JSON.stringify(this.selectedColumns))
      }
    },
    selectColumn: function(columnName) {
      if (!this.selectedColumns.includes(columnName)) {
        return this.selectedColumns = this.selectedColumns.concat([columnName])
      }

      const index = this.selectedColumns.indexOf(columnName);
      this.selectedColumns.splice(index, 1);
    },
    openFeedbackForm: function() {
      window.open('https://goo.gl/forms/H1LuoC5suvkd2bWo1', '_blank')
    },
  },
}
</script>

<style>
.column-selector__list {
  margin: 0;
  padding: 10px;
  list-style: none;
}

.column-selector__list__item {
  padding: 5px;
  text-align: center;
  cursor: pointer;
}

.mirador__button-container {
  margin: 5px;
}

.column-selector__list__item--selected {
  background-color: #B3E5FC;
}
</style>
