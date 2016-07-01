(function () {
    //################################# helpers functions
    var chromeStorage = {
        get: function (key, cb) {
            //get value by key(or keys[array returned]) from chrome storage
            if (Array.isArray(key)) {
                key = [key];
            }

            chrome.storage.sync.get(key, function (items) {
                cb(items);
            });
        }
    };

    var getElBy = {
        id: function (id) {
            //returns element by id
            return document.getElementById(id);
        },
        className: function (className) {
            //returns first element with this class
            return document.getElementsByClassName(className)[0];
        }
    };

    //##################################### code
    //tell our tab id to popup script
    //@TODO: fix possible bug: open steam explore page -> open new steam page -> turn on script
    //now it works only when: open steam explore page -> turn on script
    chrome.runtime.sendMessage({ping: 'pong'}, function (response) {
        //now popup script knows our active steam tab
    });

    //listen for new status
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            //if it is our message(see content script for understanding)
            if (request.pong === 'ping') {
                checkStatus();
            }
        }
    );

    //check status in first time
    checkStatus();

    //################## functions
    //checks script enabled status
    function checkStatus() {
        //load status
        chromeStorage.get('status', function (items) {
            var status = items.status;

            //if script activated
            if (status) {
                //if we have "next suggestion btn"
                if (getElBy.className('next_in_queue_content')) {
                    //click on it
                    getElBy.className('next_in_queue_content').click();
                } else {
                    //check if we have "generate new queue btn"
                    if (getElBy.id('refresh_queue_btn')) {
                        //click on it
                        getElBy.id('refresh_queue_btn').click();
                    }

                    //check if we have "Not safe for work alert"
                    if (getElBy.className('agegate_text_container')) {
                        //click on "resume btn"
                        getElBy.className('btn_grey_white_innerfade').click();
                    }

                    //check if we have age check
                    if (getElBy.id('ageYear')) {
                        //set birth date year
                        getElBy.id('ageYear').value = 1980;

                        //click on btn
                        getElBy.className('btnv6_blue_hoverfade').click();
                    }

                    //just for debug
                    console.log('Steam Cards Getter: No next queue btn');
                }
            } else {
                //just for debug
                console.log('Steam Cards Getter: Script offed');
            }

            //@TODO: add auto-stop after 3 cards
        });
    }
})();
