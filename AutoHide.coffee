m = require 'mithril'
u = require './utils'

class AutoHide
    constructor: ({
        @widget             # mithril view
    ,   @onHide = u.noOp    # () -> a
    }) ->
        @showWidget = false # Boolean

    onHideInternal: (elem) -> (e) =>
        unless elem.contains e.target
            @showWidget = false
        m.redraw()
        # don't cancel event bubbling
        @onHide()
        true

    show: => @showWidget = true
    hide: =>
        @showWidget = false
        @onHide()

    view: ->
        self = @
        m '.HideOnBlur'
        ,
            oncreate: (vnode) ->
                window.addEventListener 'click', self.onHideInternal(vnode.dom), true
            onremove: ->
                window.removeEventListener 'click', self.onHideInternal(vnode.dom), true

        ,   if @showWidget then @widget.view()

module.exports = AutoHide
