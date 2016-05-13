mui
===

A very very simple ui library collection. read coffee source for document.

usage
-----

+ clone this repo to your node_modules
+ use `npm` install `mithril-js` and `mss-js` to your project
+ use `webpack` as build tool.

Example usage:

```
m = require 'mithril'
s = require 'mss-js'
Modal = require 'mui/Modal'

class Demo
    constructor: ->
        @modalElem = new Modal
            widget: view: ->
                m 'h', 'hello wolrd'


    view: -> [
        m 'button', {onclick: @modalElem.show}, 'show me'
        @modalElem.view()
    ]


s.tag Modal.mss

m.mount main, new Demo()
```

customization
-------------

This library is intended to use with customization if needed, just run `npm run dev` under mui folder and change anything you want.
