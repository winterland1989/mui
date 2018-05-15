m = require 'mithril'
s = require 'mss-js'
style = require './style'
u = require './utils'
TextInput = require './TextInput'
Button = require './Button'

class TagInput
    constructor: ({
          @tagList = []         # List of String
        , placeholder = ''      # String, placeholder of tag input
        , @separators = ' ,，'     # String, list of separators which will separate tags onkeyup
        , @onAdd = u.noOp       # (String) -> a, triggered on tag adding
        , @onDel = u.noOp       # (Int) -> a, triggered on tag deleting
    }) ->
        @tagInput = new TextInput
            content: ''
            placeholder: placeholder
            onEnter: @addTag
            onKeyup: @onKeyup
        @addBtn = new Button
            text: '+'
            onClick: @addTag

    onKeyup: (c) =>
        if @separators.indexOf(c) != -1
            @tagInput.content = @tagInput.content.substring(0, @tagInput.content.length-1)
            @addTag()
    addTag: =>
        tag = @tagInput.content
        if (@tagList.indexOf(tag) == -1) and (tag != '')
            @tagList.push tag
            @onAdd(tag)
            @tagInput.content = ''

    delTag: (e) =>
        tag = u.getTargetData(e, 'tag')
        i = @tagList.indexOf(tag)
        if i != -1
            @tagList.splice(i, 1)
            @onDel(i)

    view: ->
        m '.TagInput',
            for tag in @tagList
                m '.TagItem',
                    m 'span', tag
                    m '.DelBtn',
                        'data-tag': tag
                        onclick: @delTag
                    , '✕'

            @tagInput.view()
            @addBtn.view()





TagInput.mss = s.merge [
    TextInput.mss

    TagInput:
        TagItem:
            display: 'inline-block'
            border: '1px solid ' + style.border[4]
            color: style.text[0]
            padding: '4px 12px'
            margin: '0 4px'
            DelBtn:
                display: 'inline-block'
                marginLeft: '12px'
                color: style.main[4]
                cursor: 'pointer'
                $hover:
                    color: style.warn[4]
        TextInput:
            display: 'inline-block'
            width: '100px'

        Button:
            position: 'relative'
            display: 'inline-block'
            left: '-1.7em'
            width: '1.5em'
            height: '1.5em'
            borderRadius: '0.75em'
            verticalAlign: 'middle'
            lineHeight: '1.6em'


]


module.exports = TagInput

