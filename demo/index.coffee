m = require 'mithril'
s = require 'mss-js'
buildIcon = require 'mmsvg/google/msvg/action/build'
delIcon = require 'mmsvg/google/msvg/action/delete'
infoIcon = require 'mmsvg/google/msvg/action/info-outline'
msgIcon = require 'mmsvg/google/msvg/communication/message'

Button = require '../Button'
DatePicker = require '../DatePicker'
Switch = require '../Switch'
DropDown = require '../Dropdown'
Modal = require '../Modal'
TextInput = require '../TextInput'
Collaspe = require '../Collaspe'
Notify = require '../Notify'
u = require '../utils'
style = require '../style'

class Demo
    constructor: ->
        @demoButton1 = new Button
            text: 'Just Button'

        @demoButton2 = new Button
            text: 'Build'
            prefix: u.svg buildIcon

        @demoButton3 = new Button
            text: 'Delete'
            suffix: u.svg delIcon

        @demoButtonDoc = new Collaspe
            titleArray: ['Button document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    Button = require 'mui/Button'
                    buildIcon = require 'mmsvg/google/msvg/action/build'
                    u = require 'mui/utils'

                    demoButton = new Button
                        text: 'Build'
                        prefix: u.svg buildIcon

                    ###
                        text             # String
                        prefix           # mithril svg view
                        suffix           # mithril svg view
                        data             # HashMap
                        onClick = (->)   # (HashMap) -> a
                    ###
                    """
            ]

        @demoDatePicker1 = new DatePicker
            date: new Date()

        @demoDatePicker2 = new DatePicker
            date: new Date()
            selectTime: true

        @demoDatePickerDoc = new Collaspe
            titleArray: ['DatePicker document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    # modify i18n before use
                    DatePicker = require 'mui/DatePicker'

                    demoDatePicker2 = new DatePicker
                        date: new Date()
                        selectTime: true

                    ###
                        date                         # Date
                        selectTime                   # Boolean
                        ifDateAvailable = (-> true)  # (Date) -> Boolean
                        onSelect = (->)              # (Date) -> a
                    ###
                    """
            ]

        @demoSwitch = new Switch
            enable: true

        @demoSwitchDoc = new Collaspe
            titleArray: ['Switch document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    Switch = require 'mui/Switch'

                    demoSwitch = new Switch
                        enable: true

                    ###
                        enable = true       # Boolean
                        onToggle = ( -> )   # (Boolean) -> a
                    ###
                    """
            ]

        @demoDropDown1 = new DropDown
            itemArray: ['foo', 'bar', '~~~']
            currentIndex: 2

        @demoDropDown2 = new DropDown
            itemArray: ['foo', 'bar', '~~~']
            placeholder: 'please select a foo'

        @demoDropDown3 = new DropDown
            itemArray: (i.toString() for i in [1..100])
            currentIndex: 20

        @demoDropDownDoc = new Collaspe
            titleArray: ['DropDown document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    DropDown = require 'mui/Dropdown'

                    demoDropDown3 = new DropDown
                        itemArray: (i.toString() for i in [1..100])
                        currentIndex: 20

                    ###
                        itemArray               # [String]
                        currentIndex            # Int | Undefined
                        placeholder  = ''       # String
                        onSelect = (->)         # (String, Int) -> ...
                        ifAvailable = (-> true) # (String, Int) -> ture | false
                    ###
                    """
            ]


        @demoModal1 = new Modal
            clickToHide: true
            widget: view: ->
                m 'h2', 'Close anywhere  else to close'

        @demoModal2 = new Modal
            clickToHide: false

        @demoModalOpenBtn1 = new Button
            text: 'Open a modal'
            onClick: @demoModal1.show

        @demoModalOpenBtn2 = new Button
            text: 'Open a modal'
            onClick: @demoModal2.show

        @demoModalCloseBtn = new Button
            text: 'Hide this modal'
            onClick: @demoModal2.hide

        @demoModal2.widget = @demoModalCloseBtn

        @demoModalDoc = new Collaspe
            titleArray: ['Modal document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    Modal = require 'mui/Modal'

                    demoModal1 = new Modal
                        clickToHide: true
                        widget: view: ->
                            m 'h2', 'Close anywhere  else to close'

                    ###
                        widget                 # mithril view
                        clickToHide = true     # Boolean
                        onHide = ( -> )        # () -> a
                    ###
                    """
            ]

        @demoTextInput = new TextInput
            onChange: (str) ->
                if str != 'ya!'
                    new Error 'please input "ya!"'

        @demoTextInputDoc = new Collaspe
            titleArray: ['TextInput document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    TextInput = require 'mui/TextInput'

                    demoTextInput = new TextInput
                        onChange: (str) ->
                            if str != 'ya!'
                                new Error 'please input "ya!"'

                    ###
                        content = ''           # String
                        disabled = false       # Boolean
                        placeholder = ''       # String
                        onChange = ( -> )      # (String) -> a | Error
                    ###
                    """
            ]

        @demoCollaspe = new Collaspe
            titleArray: ['Hello', 'Byte']
            expandedIndexArray: [1]
            autoCollaspe: true
            widgetArray: [
                view: ->
                    m 'span', 'hello world'
            ,
                view: ->
                    m 'span', 'bye world'
            ]

        @demoCollaspeDoc = new Collaspe
            titleArray: ['Collaspe document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    Collaspe = require 'mui/Collaspe'

                    demoCollaspe = new Collaspe
                        titleArray: ['Hello', 'Byte']
                        expandedIndexArray: [1]
                        autoCollaspe: true
                        widgetArray: [
                            view: ->
                                m 'span', 'hello world'
                        ,
                            view: ->
                                m 'span', 'bye world'
                        ]

                    ###
                        titleArray                # [String]
                        widgetArray               # [mithril widget]
                        autoCollaspe = false      # Boolean
                        expandedIndexArray = []   # [Int]
                        onExpand   = (->)         # Int -> a
                        onCollaspe = (->)         # Int -> a
                    ###
                    """
            ]

        @demoNotify1 = new Notify {}

        @demoNotifyOpenBtn1 = new Button
            text: 'Open a notify'
            onClick: => @demoNotify1.show(msgIcon, 'this is a notify')

        @demoNotify2 = new Notify
            onClick: ({foo}) => alert foo

        @demoNotifyOpenBtn2 = new Button
            text: 'Open a notify'
            onClick: => @demoNotify2.show(msgIcon, 'click me', foo: 'bar')

        @demoNotifyDoc = new Collaspe
            titleArray: ['Notify document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    Notify = require 'mui/Notify'

                    demoNotify1 = new Notify {}

                    demoNotifyOpenBtn1 = new Button
                       text: 'Open a notify'
                       onClick: => @demoNotify1.show(msgIcon, 'this is a notify')

                    demoNotify2 = new Notify
                       onClick: ({foo}) => alert foo

                    demoNotifyOpenBtn2 = new Button
                       text: 'Open a notify'
                        onClick: => @demoNotify2.show(msgIcon, 'click me', foo: 'bar')

                    ###
                        duration = 3000        # Int
                        onClick = ( -> )       # data -> a
                        show                   # (icon :: mithril svg, content :: String, data :: HashMap) -> undefined
                    ###
                    """
            ]

        @demoSpinnerDoc = new Collaspe
            titleArray: ['Spinner document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    u = require '../utils'
                    style = require '../style'

                    # directly put this into view
                    u.spinner style.main[4]

                    ###
                    utils.spinner(color, size = '1em', interval = '1s')
                    ###
                    """
            ]

    view: -> [

        m 'ul.Demo',
            m 'li', @demoButtonDoc.view()
            m 'li',
                @demoButton1.view()
                @demoButton2.view()
                @demoButton3.view()

            m 'li', @demoDatePickerDoc.view()
            m 'li', @demoDatePicker1.view()
            m 'li', @demoDatePicker2.view()

            m 'li', @demoSwitchDoc.view()
            m 'li', @demoSwitch.view()

            m 'li', @demoDropDownDoc.view()
            m 'li', @demoDropDown1.view()
            m 'li', @demoDropDown2.view()
            m 'li', @demoDropDown3.view()

            m 'li', @demoModalDoc.view()
            m 'li', @demoModalOpenBtn1.view(), @demoModal1.view()
            m 'li', @demoModalOpenBtn2.view(), @demoModal2.view()

            m 'li', @demoTextInputDoc.view()
            m 'li', @demoTextInput.view()

            m 'li', @demoCollaspeDoc.view()
            m 'li', @demoCollaspe.view()

            m 'li', @demoNotifyDoc.view()
            m 'li', @demoNotify1.view(), @demoNotify2.view()
            m 'li', @demoNotifyOpenBtn1.view(), @demoNotifyOpenBtn2.view()


            m 'li', @demoSpinnerDoc.view()
            m 'li',
                u.spinner style.main[4]
                u.spinner style.main[4], '5em'
                u.spinner style.main[4], '2em', '0.3s'
                u.spinner style.text[4], '5em'

        m '.Misc',
            m 'span', 'Winter\'s ui collection'
            m 'a', href: 'https://github.com/winterland1989/mui', 'view code on github'
            m 'a', href: 'https://github.com/winterland1989/mui/blob/gh-pages/demo/index.coffee', 'this page\'s source'

    ]

s.tag s.merge [
    Button.mss
    DatePicker.mss
    Switch.mss
    DropDown.mss
    Modal.mss
    TextInput.mss
    Collaspe.mss
    Notify.mss

    Modal:
        Button:
            display: 'inline-block'
            width: '200px'

    body:
        fontSize: '14px'
        fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif'
        fontWeight: '300'

    Demo:
        listStyle: 'none'
        li:
            margin: '14px'

    Button:
        display: 'inline-block'
        marginRight: '14px'

    Collaspe:
        width: '480px'
        textarea:
            padding: '14px'
            resize: 'none'
            width: '100%'
            height: '200px'
            border: 'none'
    Misc:
        position: 'fixed'
        top: 0
        right: 0
        padding: '14px'

        span_a:
            display: 'block'
            margin: '14px'


]


m.mount document.body, new Demo()
