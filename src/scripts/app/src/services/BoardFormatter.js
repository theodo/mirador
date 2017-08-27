const compute = function (data, doneColumns = []) {
  if (Object.keys(data).length == 0) return {};

  return data.lists.reduce(function(aggr, list) {
    const isDoneColumn = doneColumns.includes(list.title)
    Object.keys(list.labels).forEach(function(label) {
      if (label in aggr) {
        aggr[label]['cards'] += list.labels[label].cards
        aggr[label]['complexity'] += list.labels[label].complexity
        if (isDoneColumn) {
          aggr[label]['doneComplexity'] += list.labels[label].complexity
        }
      } else {
        aggr[label] = {
          cards: list.labels[label].cards,
          complexity: list.labels[label].complexity,
          doneComplexity: isDoneColumn ? list.labels[label].complexity : 0,
        }
      }
    })

    return aggr
  }, {})
}

const sort = function(data) {
  let sortedLabels = []
  Object.keys(data).forEach(function(label) {
    sortedLabels.push({
      title: label,
      cards: parseInt(data[label]['cards']),
      complexity: parseFloat(data[label]['complexity']),
      doneComplexity: parseFloat(data[label]['doneComplexity']),
    })
  })
  return sortedLabels.sort(function(a, b) {
    return a.complexity < b.complexity ? 1 : -1
  })
}

const extractColumns = function(data) {
  return data.lists.map(function(list) { return list.title })
}

export default {
  format: function(data, doneColumns) {return sort(compute(data, doneColumns))},
  extractColumns
}
