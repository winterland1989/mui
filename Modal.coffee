m = require 'mithril'
s = require 'mss-js'
u = require './utils'
style = require './style'

class Modal
    constructor: ({
        @widget                 # mithril view
    ,   @clickToHide = true     # Boolean
    ,   @onHide = u.noOp        # () -> a
    }) ->
        @showWidget = false

    onClickInternal: (e) =>
        t = u.getTarget e
        console.log u.targetHasClass t, 'HVCenter'
        if @clickToHide and ((u.targetHasClass t, 'Modal') or (u.targetHasClass t, 'HVCenter'))
            @hide()

    show: => @showWidget = true

    hide: =>
        @showWidget = false
        @onHide()

    view: ->
        if @showWidget
            m '.Modal', onclick: @onClickInternal,
                m '.HVCenter', @widget.view()

Modal.mss =
    Modal:
        width: '100%'
        height: '100%'
        position: 'fixed'
        top: 0
        left: 0
        background: style.modalBG
        zIndex: 9999

        $before:
           content: '""'
           display: 'inline-block'
           height: '100%'
           verticalAlign: 'middle'
        HVCenter:
           display: 'inline-block'
           width: '100%'
           textAlign: 'center'
           opacity: 1
           verticalAlign: 'middle'

module.exports = Modal

