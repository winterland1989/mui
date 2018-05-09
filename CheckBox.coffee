m = require 'mithril'
s = require 'mss-js'

style = require './style'
u = require './utils'

checkMark = '<svg t="1525837646330" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2010" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M923.2 219.2l-109.8-86.6c-3.4-2.8-7.6-4.8-12.4-4.8-4.8 0-9.2 2-12.6 5L389 646c0 0-157-151-161.4-155.4-4.4-4.4-10.2-11.8-19-11.8-8.8 0-12.8 6.2-17.4 10.8-3.4 3.6-59.4 62.4-87 91.6-1.6 1.8-2.6 2.8-4 4.2-2.4 3.4-4 7.2-4 11.4 0 4.4 1.6 8 4 11.4l5.6 5.2c0 0 278.6 267.6 283.2 272.2 4.6 4.6 10.2 10.4 18.4 10.4 8 0 14.6-8.6 18.4-12.4L924 243.6c2.4-3.4 4-7.2 4-11.6C928 227 926 222.8 923.2 219.2z" p-id="2011"></path></svg>'

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
        ,  m.trust checkMark

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

