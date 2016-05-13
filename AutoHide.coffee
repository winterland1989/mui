m = require 'mithril'

class AutoHide
    constructor: ({
        @widget             # mithril view
    ,   @onHide = (->)      # () -> a
    }) ->
        @showWidget = false # Boolean

    hideInternal: (elem) -> (e) =>
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
            config: (elem, afterInit, context) ->
                unless afterInit
                    window.addEventListener 'click', self.hideInternal(elem), true
                    context.onunload = ->
                        window.removeEventListener 'click', self.hideInternal(elem), true

        ,   if @showWidget then @widget.view()

module.exports = AutoHide
