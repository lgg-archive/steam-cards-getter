var tabid = false;

//listen for steam tab id
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //if it is our message(see content script for understanding)
        if (request.ping === 'pong') {
            //if we already have tabid - don't register new
            tabid = sender.tab.id;
        }

        //if we have changed status
        if (request.pong === 'ping') {
            //if we already have tabid
            if (tabid) {
                //send message to tab to recheck status
                chrome.tabs.sendMessage(tabid, {pong: 'ping'}, function (response) {
                    //now our tab check new status
                });
            }
        }
    }
);