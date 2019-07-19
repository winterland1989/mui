m = require 'mithril'
s = require 'mss-js'

style = require './style'
u = require './utils'

{ CHECK_SVG, HYPHEN_SVG } = require './CONSTANT'


class CheckBox
    constructor: ({
        @selected = true     # Boolean
    ,   @label = 'foo'       # String
    ,   @disabled = false    # Boolean
    ,   @partial = false     # Boolean
    ,   @onToggle = u.noOp   # (Boolean) -> a
    }) ->

    onToggleInternal: (e) =>
        @selected = not @selected
        @onToggle @selected

    view: ->
        m '.CheckBox'
        ,
            onclick: @onToggleInternal
            className:  if @selected then 'Enabled' else 'Disabled'
        ,  if @enabled
            if @partial then HYPHEN_SVG else CHECK_SVG

CheckBox.mss =
    CheckBox:
        display: 'inline-block'
        width: '1em'
        height: '1em'
        lineHeight: '1em'
        textAlign: 'center'
        cursor: 'pointer'
        border: '1px solid ' + style.main[4]
        color: style.main[4]
        borderRadius: '0.1em'
        verticalAlign: 'middle'
        userSelect: 'none'
        padding: 0
        svg:
            width: '1em'
            height: '1em'

    '.CheckBox.Enabled':
        background: style.main[4]
        svg:
            fill: '#fff'

    '.CheckBox.Disabled':
        background: 'none'
        color: style.main[4]
        svg:
            fill: style.main[4]

module.exports = CheckBox

