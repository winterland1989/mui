m = require 'mithril'
s = require 'mss-js'
style = require './style'
u = require './utils'

class TextInput
    constructor: ({
        @content = ''           # String
    ,   @disabled = false       # Boolean
    ,   @placeholder = ''       # String
    ,   @onChange = ( -> )      # (String) -> a | Error
    }) ->

        @validationMsg = ''     # String

    submit: ->
        if @validationMsg == '' then @content
        else new Error @validationMsg

    validateInternal: (c) ->

    onChangeInternal: (e) =>
        c = (u.getTarget e).value
        e = @onChange c
        @validationMsg = ''
        if e instanceof Error
            @validationMsg = e.message
        @content = c

    view: ->
        m '.TextInput',
            m 'input.Input',
                disabled: @disabled
                onchange: @onChangeInternal
                value: @content
                placeholder: @placeholder

            if @validationMsg != ''
                m '.ValidationMsg', @validationMsg

TextInput.mss =
    TextInput: s.LineSize('2em', '1em')
        width: '200px'
        position: 'relative'
        Input:
            display: 'block'
            border: '1px solid ' + style.border[5]
            width: '100%'
            height: '100%'
            padding: '0 0.4em'
        ValidationMsg:
            background: style.warn[5]
            color: style.text[8]
            position: 'absolute'
            top: 0
            left: '100%'
            textAlign: 'center'
            width: '200px'
            zIndex: 99
            $before:
                content: '""'
                position: 'absolute'
                top: 0
                left: '-2em'
                width: 0
                height: 0
                border: '1em solid transparent'
                borderRight: '1em solid ' + style.warn[5]

module.exports = TextInput
