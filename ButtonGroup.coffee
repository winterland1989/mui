m = require 'mithril'
s = require 'mss-js'
style = require './style'
u = require './utils'
Button = require './Button'
doneIcon = require 'mmsvg/google/msvg/action/done'

class ButtonGroup
    constructor: ({
        @textArray                # [String]
    ,   @enabledIndexArray = []   # [Int]
    ,   @multiSelection = true # Boolean
    ,   @onChange = u.noOp  # ([Int]) -> a
    }) ->

    onClickInternal: (e) =>
        i = parseInt u.getCurrentTargetData e, 'index'

        if @multiSelection
            i2 = @enabledIndexArray.indexOf i
            if i2 == -1
                @enabledIndexArray.push i
            else @enabledIndexArray.splice i2, 1
        else @enabledIndexArray = [i]

        @onChange @enabledIndexArray

    view: ->
        m 'ul.ButtonGroup',
            for t, i in @textArray
                if i in @enabledIndexArray
                    m 'li.EnabledBtn', {'data-index': i, onclick: @onClickInternal},
                        u.svg doneIcon
                        m 'span', t
                else m 'li.DisabledBtn', {'data-index': i, onclick: @onClickInternal}, t

ButtonGroup.mss =
    ButtonGroup:
        margin: 0
        padding: 0
        EnabledBtn_DisabledBtn: s.LineSize('2em', '1em')
            position: 'relative'
            display: 'inline-block'
            margin: 0
            marginRight: '1em'
            width: '100px'
            textAlign: 'center'
            listStyle: 'none'
            outline: '1px solid ' + style.main[4]
            $hover:
                cursor: 'pointer'
                background: style.main[5]
                outline: '1px solid ' + style.main[5]
                color: style.text[8]
            svg:
                left: '0.3em'
                top: '0.3em'
                position: 'absolute'
                fill: style.text[8]
                height: '1.4em'
                width: '1.4em'

        EnabledBtn:
            color: style.text[8]
            background: style.main[4]

        DisabledBtn:
            color: style.main[4]
            background: '#fff'

module.exports = ButtonGroup


