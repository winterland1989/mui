m = require 'mithril'
s = require 'mss-js'
u = require './utils'
style = require './style'
helpIcon = require 'mmsvg/google/msvg/action/help'

class QuestionMark
    constructor: ({
    ,   @icon = helpIcon
    ,   @message = "hello world!"
    }) ->


    view: ->
        m '.QuestionMark',
            m 'span', @icon
            m '.Message', m.trust @message
            m '.Arrow'
            m '.ArrowBorder'

QuestionMark.mss =
    QuestionMark:
        position: 'relative'
        display: 'inline-block'
        width: '2em'
        height: '2em'
        svg: fill: style.main[4]
        Message:
            display: 'none'
            position: 'absolute'
            background: "#fff"
            border: '1px solid #d8e2f5'
            boxShadow: '0 0 5px #dee2f5'
            borderRadius: '2px'
            width: '400px'
            left: '-40px'
            bottom: '33px'
            padding: '8px'
        Arrow:
            display: 'none'
            position: 'absolute'
            top: '-13px'
            left: '5px'
            width: '11px'
            height: '11px'
            background: '#fff'
            zIndex: 1
            transform: 'rotate(45deg)'
        ArrowBorder:
            display: 'none'
            position: 'absolute'
            top: '-14px'
            left: '4px'
            zIndex: -1
            width: '12px'
            height: '12px'
            border: '1px solid #d8e2f5'
            boxShadow: '0 0 5px #dee2f5'
            transform: 'rotate(45deg)'
        $hover:
            Arrow_ArrowBorder_Message:
                display: 'block'

module.exports = QuestionMark

