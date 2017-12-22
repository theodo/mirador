const getCsvFormattedData = function(data) {
  data = '' + data
  if (data.replace(/ /g, '').match(/[\s,"]/)) {
    return '"' + data.replace(/"/g, '""') + '"';
  }

  return data;
}

export default {
  getCsvDataFromLabels: function(labels) {
    let csv = {}
    if (labels.length > 0) {
      csv = Object.keys(labels[0]).join(',') + "\n"
      labels.forEach((epic) => {
        csv += Object.values(epic).map(epicValue => {
          return getCsvFormattedData(epicValue)
        }).join(',') + "\n"
      })
    }

    return 'data:text/csv;charset=utf-8,' + encodeURI(csv)
  }
}
