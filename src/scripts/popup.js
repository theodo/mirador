import ext from "./utils/ext";


const renderMessage = (message) => {
  const displayContainer = document.getElementById("display-container");
  displayContainer.innerHTML = `<p class='message'>${message}</p>`;
}

const renderBoard = (data) => {
  const displayContainer = document.getElementById("display-container")
  if(data) {
    window.eventBus.$emit('data-fetched', data)
  } else {
    renderMessage("Sorry, could not extract data. :'(")
  }
}

ext.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, renderBoard);
});
