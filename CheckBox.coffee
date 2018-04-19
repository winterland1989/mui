m = require 'mithril'
s = require 'mss-js'

style = require './style'
u = require './utils'

class CheckBox
    constructor: ({
        @enable = true       # Boolean
    ,   @onToggle = u.noOp   # (Boolean) -> a
    }) ->

    onToggleInternal: (e) =>
        @enable = not @enable
        @onToggle @enable

    view: ->
        m '.CheckBox'
        ,
            onclick: @onToggleInternal
            className:  if @enable then 'Enabled' else 'Disabled'
        ,  '✓'

CheckBox.mss =
    CheckBox:
        display: 'inline-block'
        width: '1.1em'
        height: '1.1em'
        lineHeight: '1.1em'
        textAlign: 'center'
        cursor: 'pointer'
        border: '1px solid ' + style.main[4]
        color: style.main[4]
        borderRadius: '0.2em'
        verticalAlign: 'middle'

    '.CheckBox.Enabled':
        background: style.main[4]
        color: '#fff'

    '.CheckBox.Disabled':
        background: 'none'
        color: style.main[6]

module.exports = CheckBox

