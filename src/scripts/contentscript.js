import ext from "./utils/ext"

const extractCardData = (card) => {
  // get complexity in the html attribute if using scrummer else in the title of the card
  const complexity = card.hasAttribute('data-calculated-points') ? card.getAttribute('data-calculated-points') : getComplexityFromTitle(card);
  const title = card.querySelector('.js-card-name').innerText
  const cardLabels = card.querySelectorAll('.card-label')

  const cardData = {
    title: title,
    complexity: complexity,
    labels: []
  }
  if (cardLabels) {
    [].forEach.call(cardLabels, function(label) {
      cardData.labels.push(label.innerText)
    })
  }
  return cardData
}

const getComplexityFromTitle = (card) => {

  const matchedNumberInParenthesisInTitle = card.querySelector('.js-card-name').innerText.match((/^\((\d+[\.,]?\d*)\).+$/));
  const complexity = matchedNumberInParenthesisInTitle ? matchedNumberInParenthesisInTitle[1] : 0;

  return complexity;
}

const extractListData = (list) => {
  const title = list.querySelector('h2').innerText
  const cards = list.querySelectorAll('.list-card')

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
