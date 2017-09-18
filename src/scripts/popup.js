import ext from "./utils/ext";

const renderBoard = (data) => {
  const displayContainer = document.getElementById("display-container")
  if(data) {
    window.eventBus.$emit('data-fetched', data)
  }
}

ext.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, renderBoard);

  window.eventBus.$on('persistDoneColumn', function(doneColumns) {
    chrome.tabs.sendMessage(activeTab.id, { action: 'persist-done-columns', load: doneColumns }, () => {});
  })
});
