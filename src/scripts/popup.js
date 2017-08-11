import ext from "./utils/ext";

const compute = function (data) {
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

const renderList = function(list) {
  let renderedList = '';
  Object.keys(list).sort().forEach(function(key) {
    renderedList += `<li>${key}: ${list[key]}</li>`;
  })

  return renderedList
}

const template = (data) => {
  return (`
    <ul>${ renderList(data) }</ul>
  `);
}

const renderMessage = (message) => {
  const displayContainer = document.getElementById("display-container");
  displayContainer.innerHTML = `<p class='message'>${message}</p>`;
}

const renderBookmark = (data) => {
  const displayContainer = document.getElementById("display-container")
  if(data) {
    const computedData = compute(data)
    const tmpl = template(computedData);
    displayContainer.innerHTML = tmpl;
  } else {
    renderMessage("Sorry, could not extract data. :'(")
  }
}

ext.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, renderBookmark);
});

const optionsLink = document.querySelector(".js-options");
optionsLink.addEventListener("click", function(e) {
  e.preventDefault();
  ext.tabs.create({'url': ext.extension.getURL('options.html')});
})
