m = require 'mithril'
s = require 'mss-js'
style = require './style'
u = require './utils'

{ BUTTON_WIDTH_MAP, BUTTON_HEIGHT_MAP, FONTSIZE_MAP } = require './CONSTANT'

module.exports = class ButtonThemed
    constructor: ({
        @label                      # String | mithril view | [mithril views]
    ,   @disabled = false           # Boolean (default = false)
    ,   @onClick = u.noOp           # (data :: String) -> a (default = ->)
    ,   @data = ''                  # String (default = '')
    ,   @size = 'M'                 # size: 'XS' | 'S' | 'M' | 'L' | 'XL'         (default = 'M')
    ,   @width ='FIXED'             # width: 'FIXED' | 'PADDING' | '100%', '123px'...       (default = '100px')
    }) ->

    onClickInternal: (e) =>
        unless @disabled
            data = u.getCurrentTargetData(e, 'data')
            @onClick(data)

    view: ->
        self = @
        m "button.ButtonThemed"
            ,
                style:
                    padding: if @width == 'PADDING' then '0 16px' else 0
                    width:
                        if @width == 'PADDING' then 'auto'
                        else if @width == 'FIXED' then BUTTON_WIDTH_MAP[@size]
                        else @width
                    height: BUTTON_HEIGHT_MAP[@size]
                    lineHeight: BUTTON_HEIGHT_MAP[@size]
                    fontSize: FONTSIZE_MAP[@size]
                onclick: @onClickInternal
                'data-data': @data
                disabled: @disabled
            , @label

ButtonThemed.mss =
    ButtonThemed:
        position: 'relative'
        borderRadius: '4px'
        border: '1px solid #2F88FF'
        textAlign: 'center'
        color: '#FFF'
        background: '#2F88FF'
        cursor: 'pointer'
        $hover_$focus:
            borderColor: '#57A5FF'
            background: '#57A5FF'
        $disabled:
            borderColor: '#A8D7FF'
            background: '#A8D7FF'
            cursor: 'not-allowed'
        $focus:
            outline: 'none'
        $active:
            borderColor: '#1C68D9'
            background: '#1C68D9'


