m = require 'mithril'
s = require 'mss-js'

style = require './style'
u = require './utils'

class Switch
    constructor: ({
        @enable = true       # Boolean
    ,   @onToggle = ( -> )   # (Boolean) -> a
    }) ->

    onToggleInternal: (e) =>
        @enable = not @enable
        @onToggle @enable

    view: ->
        m '.Switch'
        ,
            onclick: @onToggleInternal
            className:  if @enable then 'Enabled' else 'Disabled'
        ,
            m '.SwitchBtn',

Switch.mss =
    '.Switch.Enabled':
        width: '2em'
        height: '1em'
        borderRadius: '0.6em'
        padding: '0.1em'
        background: style.main[4]

    '.Switch.Disabled':
        width: '2em'
        height: '1em'
        borderRadius: '0.6em'
        padding: '0.1em'
        background: style.grey[4]
        $hover:
            background: style.grey[5]
        SwitchBtn:
            left: '1em'

    Switch:
        position: 'relative'
        $hover:
            background: style.main[5]
            cursor: 'pointer'
        SwitchBtn:
            position: 'relative'
            width: '1em'
            height: '1em'
            borderRadius: '0.5em'
            background: '#fff'
            left: 0
            transition: 'left 0.1s ease'

module.exports = Switch
