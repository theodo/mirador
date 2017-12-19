const getComplexityFromTitle = (title) => {
  const complexityDetected = title.match(/^.*\((\d+[\.,]?\d*)\).+$/);
  const complexity = complexityDetected ? complexityDetected[1] : null;

  return complexity;
}

const compute = function (data, doneColumns = []) {
  if (Object.keys(data).length == 0) return {};

  return data.lists.reduce(function(aggr, list) {
    const isDoneColumn = doneColumns.includes(list.title)
    Object.keys(list.labels).forEach(function(label) {
      if (label in aggr) {
        aggr[label]['cards'] += list.labels[label].cards
        aggr[label]['totalComplexity'] += list.labels[label].complexity
        if (isDoneColumn) {
          aggr[label]['doneComplexity'] += list.labels[label].complexity
        }
      } else {
        aggr[label] = {
          cards: list.labels[label].cards,
          complexity: getComplexityFromTitle(label),
          doneComplexity: isDoneColumn ? list.labels[label].complexity : 0,
          totalComplexity: list.labels[label].complexity,
        }
      }
    })

    return aggr
  }, {})
}

const sort = function(data) {
  console.log(data)
  let sortedLabels = []
  Object.keys(data).forEach(function(label) {
    sortedLabels.push({
      title: label,
      cards: parseInt(data[label]['cards']),
      complexity: parseFloat(data[label]['complexity']),
      doneComplexity: parseFloat(data[label]['doneComplexity']),
      totalComplexity: parseFloat(data[label]['totalComplexity']),
    })
  })
  return sortedLabels.sort(function(a, b) {
    if (a.complexity && b.complexity) {
      return a.complexity < b.complexity ? 1 : -1
    }

    if (a.complexity && !b.complexity) {
      return -1
    }

    if (!a.complexity && b.complexity) {
      return 1
    }

    if (!a.complexity && !b.complexity) {
      return a.totalComplexity < b.totalComplexity ? 1 : -1
    }
  })
}

const extractColumns = function(data) {
  return data.lists.map(function(list) { return list.title })
}

export default {
  format: function(data, doneColumns) {return sort(compute(data, doneColumns))},
  extractColumns
}
