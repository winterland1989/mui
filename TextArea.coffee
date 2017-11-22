m = require 'mithril'
s = require 'mss-js'
style = require './style'
u = require './utils'

class TextArea
    constructor: ({
        @content = ''           # String
    ,   @disabled = false       # Boolean
    ,   @placeholder = ''       # String
    ,   @onChange = u.noOp      # (String) -> a | Error
                                # triggered on Blur or user stroke Enter
    ,   @onKeydown = u.noOp     # (String) -> a | Error
                                # triggered when user press key
    ,   @onKeyup  = u.noOp      # (String) -> a | Error
                                # triggered when user release key
    ,   @allowTab = false       # Boolean
                                # allow user input `\t` with tab key
    ,   @resize = 'none'        # none | both | horizontal | vertical
                                # textarea resize attribute
    ,   @rows = 5               # Number
                                # an easier way to control height instead of inject MSS
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
        err = @onKeyup c
        @validationMsg = ''
        if err instanceof Error
            @validationMsg = err.message

    onkeydownInternal: (e) =>
        c = (u.getTarget e).value
        if @allowTab
            keyCode = e.keyCode || e.which
            if (keyCode == 9)
                e.preventDefault()
                target = u.getTarget e
                start = target.selectionStart
                end = target.selectionEnd
                @content = c.substring(0, start) + '\t' + c.substring(end)
                target.selectionStart =
                target.selectionEnd = start + 1
        else
            @content = c
        err = @onKeydown @content
        @validationMsg = ''
        if err instanceof Error
            @validationMsg = err.message

    view: ->
        m '.TextArea',
            m 'textarea.Input',
                disabled: @disabled
                onchange: @onChangeInternal
                onkeyup: @onkeyupInternal
                onkeydown: @onkeydownInternal
                value: @content
                placeholder: @placeholder
                rows: @rows
                style:
                    resize: @resize
            if @validationMsg != ''
                m '.ValidationMsg', @validationMsg

TextArea.mss =
    TextArea:
        # why 1.93em you may ask?
        # because it will align Dropdown, TextArea and anyother things nicely
        position: 'relative'
        width: '400px'
        Input:
            display: 'block'
            border: '1px solid ' + style.border[4]
            fontSize: '1em'
            padding: '0 0.4em'
            WebkitAppearance: 'none'
            borderRadius: 0
            width: '100%'
        ValidationMsg: s.LineSize('1.93em', '1em')
            background: style.warn[5]
            color: style.text[8]
            position: 'absolute'
            bottom: 0
            left: 0
            textAlign: 'center'
            zIndex: 99
            width: '100%'

module.exports = TextArea
