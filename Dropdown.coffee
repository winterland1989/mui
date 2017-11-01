m = require 'mithril'
s = require 'mss-js'

style = require './style'
u = require './utils'

AutoHide = require './AutoHide'

class Dropdown
    constructor: ({
        @itemArray               # [String]
    ,   @currentIndex            # Int | Undefined
    ,   @placeholder  = ''       # String
    ,   @onSelect = u.noOp         # (String, Int) -> ...
    ,   @ifAvailable = (-> true)   # (String, Int) -> ture | false
    }) ->
        @filter = ''
        @autoHideDropDown = new AutoHide
            onHide: => @filter = ''
            widget: view: =>
                m 'ul.DropdownList', onclick: @onSelectInternal,
                    for item, i in @itemArray when ((item.indexOf @filter) != -1)
                        m 'li.DropdownItem'
                        ,
                            oncreate: u.scrollToView
                            key: i
                            className:
                                (if @currentIndex == i then 'Current ' else '') +
                                (if @ifAvailable(item, i) then 'Available' else '')
                            'data-index': i
                            'data-content': item
                        , item

    autoComplete: (e) =>
        @filter = (u.getTarget e).value


    onSelectInternal: (e) =>
        if u.targetHasClass (u.getTarget e), 'Available'
            index = parseInt u.getTargetData(e, 'index')
            content = u.getTargetData e, 'content'
            unless isNaN index
                @currentIndex = index
                @filter = ''
                @autoHideDropDown.hide()
                @onSelect(content, index)

    view: ->
        m '.Dropdown',
            m 'input.DropdownInput'
            ,
                onchange: @autoComplete
                onclick: @autoHideDropDown.show
                placeholder: @placeholder
                value:
                    if @filter
                        @filter
                    else if @currentIndex?
                        @itemArray[@currentIndex]
                    else ''
            @autoHideDropDown.view()

Dropdown.mss =
    Dropdown:
        position: 'relative'
        width: '200px'
        DropdownInput:
            display: 'block'
            lineHeight: '2em'
            fontSize: '0.9em'
            width: '100%'
            padding: 0
            textAlign: 'center'
            border: '1px solid ' + style.border[4]
            WebkitAppearance: 'none'
            borderRadius: 0
        DropdownList:
            position: 'absolute'
            top: '1.9em'
            border: '1px solid #ccc'
            width: '198px'
            height: '200px'
            margin: 0
            padding: 0
            listStyle: 'none'
            background: '#fff'
            overflowY: 'auto'
            zIndex: 999
            DropdownItem: s.LineSize('2em', '0.9em')
                textAlign: 'center'
                overflowX: 'hidden'
                padding: '0 4px'
                margin: 0
                color: style.text[5]
                $hover:
                    cursor: 'pointer'
                    background: style.main[5]
                    color: style.text[8]

            Available:
                color: style.text[0]

            Current:
                background: style.main[4]
                color: style.text[8]

module.exports = Dropdown
