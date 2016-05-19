m = require 'mithril'
s = require 'mss-js'
u = require './utils'
style = require './style'


arrowRight = require 'mmsvg/google/msvg/hardware/keyboard-arrow-right'
arrowDown = require 'mmsvg/google/msvg/hardware/keyboard-arrow-down'

class Collaspe
    constructor: ({
        @titleArray                # [String]
    ,   @widgetArray               # [mithril widget]
    ,   @autoCollaspe = false      # Boolean
    ,   @expandedIndexArray = []   # [Int]
    ,   @onExpand   = (->)         # Int -> a
    ,   @onCollaspe = (->)         # Int -> a
    }) ->
        @showWidget = false # Boolean

    onFoldInternal: (e) =>
        i = parseInt (u.getCurrentTargetData e, 'index')
        if @autoCollaspe
            @expandedIndexArray = [i]
        else if i in @expandedIndexArray
            u.removeFromArray @expandedIndexArray, i
        else @expandedIndexArray.push i

    view: ->
        self = @
        m '.Collaspe',
            for title, i in @titleArray
                expanded = i in @expandedIndexArray
                [
                    m '.CollaspeTitle'
                    ,
                        key: 'title' + i
                        'data-index': i.toString()
                        onclick: @onFoldInternal
                    ,
                        if expanded then u.svg arrowDown else u.svg arrowRight
                        m 'span', title

                    m '.CollaspeBody'
                    ,
                        className: if expanded then 'Current' else ''
                        key: 'body' + i
                        onclick: @onFoldInternal
                    ,    if expanded then @widgetArray[i].view()
                ]

Collaspe.mss =
    Collaspe:
        CollaspeTitle: s.LineSize('2em', '1em')
            color: style.text[8]
            background: style.main[4]
            border: '1px solid ' + style.main[4]
            padding: '0 0.4em'
            $hover:
                cursor: 'pointer'
            svg:
                fill: style.text[8]
                height: '1.4em'
                width: '1.4em'
                padding: '0.3em'
                verticalAlign: 'middle'
            span:
                verticalAlign: 'middle'

        CollaspeBody:
            border: '1px solid ' + style.border[4]
            borderTop: 'none'

module.exports = Collaspe
