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
                    m '.AddBtn', onclick: @addTag,
                        m.trust '<svg t="1526436892886" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1905" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 64C264.64 64 64 264.576 64 512c0 247.36 200.64 448 448 448 247.424 0 448-200.64 448-448C960 264.576 759.424 64 512 64zM734.272 553.216l-181.12-0.064 0 181.184c0 23.488-18.368 42.624-41.152 42.624-22.72 0.064-41.152-19.072-41.152-42.56L470.848 553.152l-181.12 0C266.24 553.216 246.976 534.656 246.976 512.064c0.128-22.656 19.264-41.152 42.88-41.088l180.992 0L470.848 289.792c0-23.68 18.496-42.688 41.152-42.752 22.72-0.064 41.152 19.136 41.152 42.688l0 181.248 181.12 0c23.616-0.128 42.752 18.432 42.752 41.152C777.024 534.656 758.016 553.216 734.272 553.216z" p-id="1906"></path></svg>'

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

        AddBtn:
            position: 'absolute'
            right: '0.2em'
            top: '0.165em'
            cursor: 'pointer'
            svg:
                fill: style.main[4]
                width: '1.6em'
                height: '1.6em'


]


module.exports = TagInput

