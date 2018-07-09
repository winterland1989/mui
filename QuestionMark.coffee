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

QuestionMark.mss =
    QuestionMark:
        position: 'relative'
        display: 'inline-block'
        width: '2em'
        height: '2em'
        svg: fill: style.main[4]
        Message:
            display: 'none'
        $hover:
            Message:
                color: '#fff'
                width: '200px'
                left: '2em'
                top: '-0.2em'
                position: 'absolute'
                display: 'block'
                background: style.main[4]
                padding: '0.5em'
                $before:
                    content: '""'
                    position: 'absolute'
                    top: 0
                    left: '-1.5em'
                    width: 0
                    height: 0
                    border: '1em solid transparent'
                    borderRight: '1em solid ' + style.main[4]

module.exports = QuestionMark

