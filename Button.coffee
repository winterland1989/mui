m = require 'mithril'
s = require 'mss-js'
style = require './style'
u = require './utils'

class Button
    constructor: ({
        @text               # String
    ,   @prefix             # mithril svg view
    ,   @suffix             # mithril svg view
    ,   data = null         # HashMap
    ,   @disabled = false
    ,   @onClick = u.noOp   # (HashMap) -> a
    }) ->
        @dataJSON = JSON.stringify data

    onClickInternal: (e) =>
        unless @disabled
            json = u.getCurrentTargetData(e, 'json')
            data = JSON.parse json
            @onClick(data)

    view: ->
        self = @
        m '.Button'
            ,
                onclick: @onClickInternal
                'data-json': @dataJSON
                className: if @disabled then 'Disabled' else ''
            ,
                m '.Prefix', @prefix
                m 'span', @text
                m '.Suffix', @suffix

Button.mss =
    Button: s.LineSize('2em', '1em')
        position: 'relative'
        width: '100px'
        textAlign: 'center'
        background: style.main[4]
        color: style.text[8]
        borderRadius: '0.1em'
        Prefix_Suffix:
            position: 'absolute'
            svg:
                fill: style.text[8]
                height: '1.4em'
                width: '1.4em'
        Prefix:
            left: '0.3em'
            top: '0.3em'
        Suffix:
            right: '0.3em'
            top: '0.3em'

        cursor: 'pointer'
        $hover:
            background: style.main[5]

    '.Button.Disabled':
        background: style.border[4]
        cursor: 'not-allowed'


module.exports = Button

