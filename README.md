# Steam cards getter

It's simple chrome extension for clicking "Next in queue" buttons on Steam Sales

## How to use

### Installation

* [Install from Chrome Store](https://chrome.google.com/webstore/detail/jkpbeadnomoejfoakjnnpcaiijgbnggk/)

#### From sources

* open `chrome://extensions`
* enable 'Developer mode'
* add unpacked extension
* choose path for `extension directory`

#### Packaging

* [More info here](https://developer.chrome.com/extensions/packaging)

## Usage

* Open popup script
* Turn on script
* open "go to start page!"
* wait some time, while script will be clicking and getting cards
* after 3 cards received turn script off

# How it works?

It uses javascript .click() method. More info about it you can find here:
* [HTMLElement.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click)

## What about security?

* Steam, fortunately, don't detect if click was made by human or by code
    * more info about detecting here:
        * [1](http://stackoverflow.com/questions/7635274/how-to-detect-if-a-click-is-a-mouse-click-or-triggered-by-some-code)
        * [2](http://stackoverflow.com/questions/14794380/detect-if-button-click-real-user-or-triggered-by-a-script)
    * **AGAIN, FOR NOW STEAM DOESN'T DETECT THIS, SO THERE IS NOTHING TO AFRAID**
* What about my credentials and others?
    * you can read what is 'content scripts in Chrome Extensions'
    * then watch code [here](./extension/content-scripts/steam-cards-getter-content-script.js)
    * so you will find that there is nothing to afraid, it just finds elements and click on them

## Why?

I made just for fun and in cause of my laziness

## ToDo

*Pull Requests are welcome*

* add hotkeys
* make cool design
* make normal icon for popup
* escape from callback hell
* add auto-detect and auto-stop, when enough cards got

## License

* MIT
* 2016 littleguga