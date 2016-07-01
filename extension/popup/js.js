var links = {
    github: 'https://github.com/littleguga/steam-cards-getter',
    docs: 'https://github.com/littleguga/steam-cards-getter/',
    start: 'http://store.steampowered.com/explore/'
};

//wait dom content to be loaded
document.addEventListener('DOMContentLoaded', function () {
    //load toggle btn status
    var status;
    chromeStorage.get('status', function (items) {
        status = items.status;

        //if we have no val in storage
        if (typeof status === 'undefined') {
            chromeStorage.set({status: false}, function () {
                //no need to change anything
                //status is off
            });
        } else {
            if (status) {
                //set status btn to on status
                toggleToggleBtn(true);
            } else {
                //also
                //no need to change anything
                //status is off
            }
        }

        //bind toggle btn
        trigger(getElBy.id('toggle'), function () {
            //load old status
            chromeStorage.get('status', function (items) {
                //set new status
                chromeStorage.set({status: !items.status}, function () {
                    //load new status
                    chromeStorage.get('status', function (items) {
                        //update btn status
                        toggleToggleBtn(items.status);

                        //send message to our tab
                        chrome.runtime.sendMessage({pong: 'ping'}, function (response) {
                            //now our tab check new status
                        });
                    });
                });
            });
        });
    });

    //bind links
    for (var index in links) {
        //save link
        getElBy.id(index).setAttribute('data-href', links[index]);

        //bind func
        trigger(getElBy.id(index), function () {
            chrome.tabs.create({url: this.getAttribute('data-href')});
        });
    }
});


//toggle functions

//toggle toggle btn
function toggleToggleBtn(status) {
    var text;
    var el = getElBy.id('toggle');
    toggleClass(el, 'on');
    toggleClass(el, 'off');

    if (status) {
        //status is on
        //set btn to off
        text = 'Turn off script';
    } else {
        //status is off
        //set btn to on
        text = 'Turn on script';
    }
    el.textContent = text;
}

//################### Helper functions

function trigger(el, evt, func) {
    if (typeof evt === 'function') {
        el.addEventListener('click', evt);
    } else {
        el.addEventListener(evt, func);
    }
}

var getElBy = {
    id: function (id) {
        //get element by id
        return document.getElementById(id);
    }
};

var chromeStorage = {
    get: function (key, cb) {
        //get value by key(or keys[array returned]) from chrome storage
        if (Array.isArray(key)) {
            key = [key];
        }

        chrome.storage.sync.get(key, function (items) {
            cb(items);
        });
    },
    set: function (obj, cb) {
        //set values to chrome storage | object needed
        chrome.storage.sync.set(obj, function () {
            cb();
        });
    }
};

//toggle class
function toggleClass(el, className) {
    el.classList.toggle(className);
}
