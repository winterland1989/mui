m = require 'mithril'
s = require 'mss-js'
style = require './style'
u = require './utils'

class TextInput
    constructor: ({
        @content = ''           # String
    ,   @disabled = false       # Boolean
    ,   @placeholder = ''       # String
    ,   @onChange = u.noOp      # (String) -> a | Error
                                # triggered on Blur or user stroke Enter
    ,   @onKeyup  = u.noOp      # (String) -> a | Error
                                # triggered when user stroke non-Enters
    ,   @onEnter  = u.noOp      # (String) -> a | Error
                                # triggered when user stroke Enter
    ,   @onClick = u.noOp       # () -> a
                                # triggered when user click the input

    }) ->

        @validationMsg = ''     # String

    submit: ->
        if @validationMsg == '' then @content
        else new Error @validationMsg

    validateInternal: (c) ->

    onChangeInternal: (e) =>
        c = (u.getTarget e).value
        err = @onChange c
        @validationMsg = ''
        if err instanceof Error
            @validationMsg = err.message
        @content = c

    onkeyupInternal: (e) =>
        c = (u.getTarget e).value
        @content = c
        if (e.keyCode == 13 or e.key == "Enter")
            if @validationMsg == ''
                err = @onEnter (@content)
                if err instanceof Error
                    @validationMsg = err.message
        else
            err = @onKeyup c
            @validationMsg = ''
            if err instanceof Error
                @validationMsg = err.message

    view: ->
        m '.TextInput',
            m 'input.Input',
                disabled: @disabled
                onchange: @onChangeInternal
                onkeyup: @onkeyupInternal
                value: @content
                placeholder: @placeholder
                onclick: @onClick
            if @validationMsg != ''
                m '.ValidationMsg', @validationMsg

TextInput.mss =
    TextInput: s.LineSize('1.93em', '1em')
        # why 1.93em you may ask?
        # because it will align Dropdown, TextInput and anyother things nicely
        width: '200px'
        position: 'relative'
        Input:
            display: 'block'
            border: '1px solid ' + style.border[4]
            width: '100%'
            height: '100%'
            fontSize: '1em'
            padding: '0 0.4em'
            WebkitAppearance: 'none'
            borderRadius: 0
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
