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
        , @maxTagNum = Number.MAX_SAFE_INTEGER  # Int, limit the max tag user can input
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
        if (@tagList.indexOf(tag) == -1) and (tag != '') and (@tagList.length < @maxTagNum)
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

            if @tagList.length < @maxTagNum
                m '.TagInputGroup',
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
            margin: '0 4px 4px 0'
            verticalAlign: 'middle'

            DelBtn:
                display: 'inline-block'
                marginLeft: '12px'
                color: style.main[4]
                cursor: 'pointer'
                $hover:
                    color: style.warn[4]

        TagInputGroup:
            position: 'relative'
            display: 'inline-block'
            verticalAlign: 'middle'
            margin: '0 4px 4px 0'
            width: '100px'
            TextInput:
                width: '100%'

        Button:
            position: 'absolute'
            margin: 0
            display: 'inline-block'
            right: '0.2em'
            width: '1.6em'
            top: '0.165em'
            height: '1.6em'
            lineHeight: '1.65em'
            borderRadius: '0.8em'
            verticalAlign: 'middle'


]


module.exports = TagInput

