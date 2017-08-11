import ext from "./utils/ext"

const extractCardData = (card) => {
  const title = card.querySelector('.js-card-name').innerText
  const cardLabels = card.querySelectorAll('.card-label')

  const cardData = {
    title: title,
    labels: []
  }
  if (cardLabels) {
    [].forEach.call(cardLabels, function(label) {
      cardData.labels.push(label.innerText)
    })
  }

  return cardData
}

const extractListData = (list) => {
  const title = list.querySelector('h2').innerText
  const cards = list.querySelectorAll('.list-card-details')

  const listData = {
    title: title,
    labels: {}
  }

  const listCards = []
  if (cards) {
    [].forEach.call(cards, function(card) {
      listCards.push(extractCardData(card))
    })
  }

  listCards.forEach(function(card) {
    card.labels.forEach(function(label) {
      if (!(label in listData.labels)) {
        listData.labels[label] = []
      }
      listData.labels[label].push(card)
    })
  })

  return listData
}

const extractBoardData = () => {
  const lists = document.querySelectorAll('.list')
  const boardData = {
    title: document.querySelector('.board-header-btn-text').innerText,
    lists: []
  }

  if (lists) {
    [].forEach.call(lists, function(list) {
      boardData.lists.push(extractListData(list))
    })
  }

  return boardData
}

function onRequest(request, sender, sendResponse) {
  if (request.action === 'process-page') {
    sendResponse(extractBoardData())
  }
}

window.addEventListener('load', function() {
  ext.runtime.onMessage.addListener(onRequest);
})
