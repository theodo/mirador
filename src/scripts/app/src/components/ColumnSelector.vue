<template>
  <div class="column-selector">
    <div
      class="column-selector__button"
      @click="openColumnSelector"
    >{{ selectorTitle }}</div>
    <ul v-if="isOpen" class="column-selector__list">
      <li
        v-for="column in columns"
        @click="selectColumn(column)"
        class="column-selector__list__item"
        :class="{'column-selector__list__item--selected': selectedColumns.includes(column)}"
      >
        {{ column }}
      </li>
    </ul>
    <div
      class="column-selector__button"
      v-if="isOpen"
      @click="openColumnSelector"
    >{{ selectorTitle }}</div>
  </div>
</template>

<script>
export default {
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
  computed: {
    selectorTitle: function() {
      if (this.isOpen) {
        return (this.selectedColumns.length > 0) ? `validate (${this.selectedColumns.length})` : 'select done columns'
      }
      return (this.selectedColumns.length > 0)
        ? this.selectedColumns.length + ' columns selected'
        : 'select done columns'
    },
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
  },
}
</script>

<style>
.column-selector__button {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #4FC3F7;
  height: 56px;
  text-transform: uppercase;
}

.column-selector__list {
  background-color: #B3E5FC;
  margin: 0;
  padding: 10px;
  list-style: none;
}

.column-selector__list__item {
  background-color: white;
  padding: 5px;
  text-align: center;
}

.column-selector__list__item--selected {
  background-color: #B3E5FC;
}
</style>
