m = require 'mithril'
s = require 'mss-js'
u = require './utils'
style = require './style'

contentArray = []
iconArray = []
dataArray = []
timerArray = []
keyCounter = 0

class Notify
    constructor: ({
    ,   @duration = 3000        # Int
    ,   @onClick = ( -> )       # data -> a
    }) ->
        @indexArray = []

    onClickInternal: (e) =>
        index = parseInt (u.getCurrentTargetData e, 'index')
        data = JSON.parse (u.getCurrentTargetData e, 'data')
        @hideInternal(index)
        @onClick data

    show: (icon, content, data = null) =>
        contentArray.push
            content: content
            context: @
            key: keyCounter++

        iconArray.push icon
        dataArray.push data
        timerArray.push setTimeout(
            => @hideInternal 0
        ,   @duration
        )

    hideInternal: (i) =>
        iconArray.splice i, 1
        contentArray.splice i, 1
        dataArray.splice i, 1
        clearTimeout timerArray[i]
        timerArray.splice i, 1
        m.redraw()

    view: ->
        m '.Notify',
            for {key, content, context}, i in contentArray when context == @
                m '.NotifyItem'
                ,
                    key: key
                    'data-index': i
                    'data-data': JSON.stringify dataArray[i]
                    onclick: @onClickInternal
                    style:
                        right:  '1em'
                        top: (1 + 5 * i) + 'em'
                ,
                    m '.Icon', iconArray[i]
                    m '.Content', content

Notify.mss =
    Notify:
        NotifyItem:
            width: '20em'
            height: '4em'  # if you change this, please change in the view too
            position: 'fixed'
            right: '1em'
            background: '#fff'
            border: '1px solid ' + style.border[4]
            zIndex: 9999
            borderRadius: '0.4em'
            transition: 'top 0.1s ease'
            Content:
                width: '16em'
                textAlign: 'center'
                display: 'inline-block'
                verticalAlign: 'middle'
            Icon_CloseBtn:
                width: '4em'
                textAlign: 'center'
                display: 'inline-block'
                svg: s.LineSize('4em', '1em')
                    verticalAlign: 'middle'

module.exports = Notify

