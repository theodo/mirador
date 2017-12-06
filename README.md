# Mirador

## Goal

Provide an extension to Product Owner so that they have a clear vision on how much they consumed on a subject or how much they still have to do on another.

## Chrome extension

Guys, go and [download the app](https://chrome.google.com/webstore/detail/mirador/hocimlpionmkjkilffhmhpbdhnooakmc) in the chrome store

## Extension

We use the extension-boilerplate project from EmailThis. It provides an abstraction over the different browser API, so we can publish the extension on all webstores.

As an extension, the app is divided in 3 parts:

- contentscript.js
- popup.js
- app/

#### contentscript.js

The script is in charge of the data extraction from the trello. It builds the following structure to represent the board:

```
board
  `- title "WonderBoard"
  `- lists: []
      |- list1
      |  `- title "Sprint Backlog"
      |  `- labels
      |      |- Deployment
      |      |   `- title "Deployment"
      |      |   `- cards 28
      |      |   `- complexity 62
      |      |- Feature 1
      ...
```

It doesn't expose the card content to the extension, as it focus on macro-informations.

#### popup.js

To handle the communication between the webpage and the popup, we use the messaging interface of browser extension `ext.runtime.onMessage` to publish two `actions`:

- `process-page` to extract data from the trello board
- `persist-done-columns` to persist the columns selected as "done columns" in the localStorage

## Push to prod
- Change the version in manifest.json
- build the application in prod
- give the chrome.zip to Cyrille

