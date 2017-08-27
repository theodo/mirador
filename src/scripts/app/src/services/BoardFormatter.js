const compute = function (data) {
  if (Object.keys(data).length == 0) return {};

  return data.lists.reduce(function(aggr, list) {
    Object.keys(list.labels).forEach(function(label) {
      if (label in aggr) {
        aggr[label] += list.labels[label].length
      } else {
        aggr[label] = list.labels[label].length
      }
    })

    return aggr
  }, {})
}

const sort = function(data) {
  let sortedLabels = []
  Object.keys(data).forEach(function(label) {
    sortedLabels.push({title: label, value: parseInt(data[label])})
  })
  return sortedLabels.sort(function(a, b) {
    return a.value < b.value ? 1 : -1
  })
}

export default {
  format: function(data) {return sort(compute(data))}
}
