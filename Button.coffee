m = require 'mithril'
s = require 'mss-js'
style = require './style'
u = require './utils'

class Button
    constructor: ({
        @text               # String
    ,   @prefix             # mithril view
    ,   @suffix             # mithril view
    ,   data                # HashMap
    ,   @onClick = (->)     # (HashMap) -> a
    }) ->
        @dataJSON = if date? then JSON.stringify data else ''

    onClickInternal: (e) =>
        json = u.getCurrentTargetData(e, 'json')
        data = if json then JSON.parse json
        @onClick(data)

    view: ->
        self = @
        m '.Button'
            ,
                onclick: @onClickInternal
                'data-json': @dataJSON
            ,
                @prefix
                m 'span', @text
                @suffix

Button.mss =
    Button: s.LineSize('2em', '1em')
        width: '100px'
        textAlign: 'center'
        background: style.main[4]
        color: style.text[8]
        $hover:
            cursor: 'pointer'
            background: style.main[5]

module.exports = Button

