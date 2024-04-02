chrome.runtime.onInstalled.addListener(function() {
    console.log('The extension has been installed!');
  });
  
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
      console.log('Tab URL has been updated!');
    }
  });
  