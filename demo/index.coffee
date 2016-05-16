m = require 'mithril'
s = require 'mss-js'

Switch = require '../Switch'

class Demo
    constructor: ->
        @demoSwitch = new Switch {}


    view: -> [
        @demoSwitch.view()
    ]


s.tag s.merge [
    Switch.mss


]

m.mount document.body, new Demo()
