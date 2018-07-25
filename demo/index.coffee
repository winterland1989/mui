m = require 'mithril'
s = require 'mss-js'
buildIcon = require 'mmsvg/google/msvg/action/build'
delIcon = require 'mmsvg/google/msvg/action/delete'
infoIcon = require 'mmsvg/google/msvg/action/info-outline'
msgIcon = require 'mmsvg/google/msvg/communication/message'

Button = require '../Button'
ButtonGroup = require '../ButtonGroup'
DatePicker = require '../DatePicker'
Switch = require '../Switch'
CheckBox  =require '../CheckBox'
DropDown = require '../Dropdown'
Modal = require '../Modal'
TextInput = require '../TextInput'
TagInput  =require '../TagInput'
TextArea = require '../TextArea'
Collaspe = require '../Collaspe'
Notify = require '../Notify'
QuestionMark = require '../QuestionMark'

u = require '../utils'
style = require '../style'
tableView = require '../tableView'

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

        @demoButton4 = new Button
            text: 'Disabled'
            disabled: true

        @demoButtonDoc = new Collaspe
            titleArray: ['Button document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    Button = require 'mui-js/Button'
                    buildIcon = require 'mmsvg/google/msvg/action/build'
                    u = require 'mui-js/utils'

                    demoButton = new Button
                        text: 'Build'
                        prefix: u.svg buildIcon

                    ###
                        text             # String
                        prefix           # mithril svg view
                        suffix           # mithril svg view
                        data             # HashMap
                        disabled         # Boolean
                        onClick = (->)   # (HashMap) -> a
                    ###
                    """
            ]

        @demoBtnGroupDoc = new Collaspe
            titleArray: ['ButtonGroup document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    ButtonGroup = require 'mui-js/ButtonGroup'

                    demoBtnGroup = new ButtonGroup
                        textArray: ['foo', 'bar', 'qux']
                        onChange: (enabledArray) => ...

                    ###
                        textArray         # [String]
                        enabledIndexArray # [Int]
                        multiSelection    # Boolean
                        onChange = ->     # ([Int]) -> a
                    ###
                    """
            ]


        @demoBtnGroup = new ButtonGroup
            textArray: ['foo', 'bar', 'qux']
            onChange: (enabledArray) =>
                @demoNotify1.show(msgIcon, JSON.stringify enabledArray)

        @demoBtnGroup2 = new ButtonGroup
            textArray: ['foo', 'bar', 'qux']
            multiSelection: false
            onChange: (enabledArray) =>
                @demoNotify1.show(msgIcon, JSON.stringify enabledArray)

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
                    DatePicker = require 'mui-js/DatePicker'

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
                    Switch = require 'mui-js/Switch'

                    demoSwitch = new Switch
                        enable: true

                    ###
                        enable = true       # Boolean
                        onToggle = ( -> )   # (Boolean) -> a
                    ###
                    """
            ]

        @demoCheckBox = new CheckBox
            enable: true

        @demoCheckBoxDoc = new Collaspe
            titleArray: ['CheckBox document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    CheckBox = require 'mui-js/CheckBox'

                    demoCheckBox = new CheckBox
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
            allowEmptySelect: false

        @demoDropDownDoc = new Collaspe
            titleArray: ['DropDown document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    DropDown = require 'mui-js/Dropdown'

                    demoDropDown3 = new DropDown
                        itemArray: (i.toString() for i in [1..100])
                        currentIndex: 20

                    ###
                        itemArray               # [String]
                        currentIndex            # Int | Undefined
                        placeholder  = ''       # String
                        onSelect = (->)         # (String, Int) -> ...
                        ifAvailable = (-> true) # (String, Int) -> ture | false
                        allowEmptySelect = true # Bool
                    ###
                    """
            ]


        @demoModal1 = new Modal
            widget: view: ->
                m 'h2'
                ,
                    style:
                        width: '200px'
                        margin: '0 auto'
                        background: '#fff'
                ,'Close anywhere  else to close'

        @demoModal2 = new Modal
            clickToHide: false
            escToHide: false

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
                    Modal = require 'mui-js/Modal'
                    # make sure widget inside is a block element

                    demoModal1 = new Modal
                        clickToHide: true
                        widget: view: ->
                            m 'h2'
                            ,
                                style:
                                    width: '200px'
                                    margin: '0 auto'
                                    background: '#fff'
                            ,'Close anywhere  else to close'

                    ###
                        widget                 # mithril view
                        clickToHide = true     # Boolean
                        escToHide = true       # Boolean
                        onHide = ( -> )        # () -> a
                    ###
                    """
            ]

        @demoTextInput1 = new TextInput
            placeholder: 'type something...'
            onChange: (str) ->
                if str != 'ya!'
                    new Error 'please input "ya!"'

        @demoTextInput2 = new TextInput
            placeholder: 'type digits and enter!'
            onChange: (str) ->
                unless (/^\d+$/).test str
                    new Error 'please input some digits'
            onEnter: (str) ->
                unless (/^\d+$/).test str
                    new Error 'please input some digits'
                else alert str

        @demoTextInputDoc = new Collaspe
            titleArray: ['TextInput document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    TextInput = require 'mui-js/TextInput'

                    demoTextInput = new TextInput
                        onChange: (str) ->
                            if str != 'ya!'
                                new Error 'please input "ya!"'

                    ###
                        @content = ''           # String
                        @disabled = false       # Boolean
                        @placeholder = ''       # String
                        @onChange = u.noOp      # (String) -> a | Error
                                                # triggered on Blur
                        @onEnter = u.noOp       # (String) -> a | Error
                                                # triggered when user release Enter
                        @onKeyup  = u.noOp      # (String) -> a | Error
                                                # triggered when user release key
                    ###
                    """
            ]

        @demoTagInputDoc = new Collaspe
            titleArray: ['TagInput document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    TagInput = require 'mui-js/TagInput'

                    @demoTagInput = new TagInput
                        tagList: ['foo', 'bar', 'qux']

                    ###
                        @tagList = []         # List of String
                        placeholder = ''      # String, placeholder of tag input
                        @separators = ' ,，'     # String, list of separators which will separate tags onkeyup
                        @onAdd = u.noOp       # (String) -> a, triggered on tag adding
                        @onDel = u.noOp       # (Int) -> a, triggered on tag deleting
                        @maxTagNum = Number.MAX_SAFE_INTEGER  # Int, limit the max tag user can input
                    ###
                    """
            ]

        @demoTagInput = new TagInput
            tagList: ['foo', 'bar', 'qux']

        @demoQuestionMark = new QuestionMark
            message: 'This is a help message, <a href="//nowhere">link</a><p>test</p><p>test</p><p>test</p>'

        @demoQuestionMarkDoc = new Collaspe
            titleArray: ['QuestionMark document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    QuestionMark = require 'mui-js/QuestionMark'

                    demoQuestionMark = new QuestionMark
                        message: 'This is a help message, <a href="//nowhere">link</a>'

                    ###
                        @icon = mmsvg/action/help       # mmsvg icon
                        @message = "hello world!"       # String
                    ###
                    """
            ]

        @demoTextArea = new TextArea
            placeholder: 'type digits and enter!'
            onChange: (str) ->
                unless (/^\d+$/).test str
                    new Error 'please input some digits'

        @demoTextArea2 = new TextArea
            placeholder: 'this textarea allow tab key'
            allowTab: true

        @demoTextAreaDoc = new Collaspe
            titleArray: ['TextArea document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    TextArea = require 'mui-js/TextArea'

                    demoTextArea = new TextArea
                        onChange: (str) ->
                            if str != 'ya!'
                                new Error 'please input "ya!"'

                    ###
                        content = ''           # String
                        disabled = false       # Boolean
                        placeholder = ''       # String
                        onChange = u.noOp      # (String) -> a | Error
                                               # triggered on Blur or user stroke Enter
                        onKeyup  = u.noOp      # (String) -> a | Error
                                               # triggered when user stroke non-Enters
                        resize = 'none'        # none | both | horizontal | vertical
                                               # textarea resize attribute
                        rows = 5               # Number
                                               # an easier way to control height instead of inject MSS
                    ###
                    """
            ]

        @demoTableViewColMap =
            name: '名称'
            age: '年龄'
            salary: '工资'

        @demoTableViewData =
            [ {name: 'Joe', age: 24, salary: 10000}
            , {name: 'Kia', age: 13, salary: 20000}
            , {name: 'Lee', age: 14, salary: 40000}
            ]

        @demoTableViewDoc = new Collaspe
            titleArray: ['tableView document']
            widgetArray: [
                view: ->
                    m 'textarea', readonly: true,
                    """
                    tableView = require 'mui-js/tableView'

                    demoTableViewColMap =
                        name: '名称'
                        age: '年龄'
                        salary: '工资'

                    demoTableViewData =
                        [ {name: 'Joe', age: 24, salary: 10000}
                        , {name: 'Kia', age: 13, salary: 20000}
                        , {name: 'Lee', age: 14, salary: 40000}
                        ]

                    tableView(demoTableViewColMap, demoTableViewData)
                    ###
                        colMap                 # HashMap
                                               # map key to column label
                        data                   # Array of HashMap
                                               # array of table data
                        verticalHeader = false # show header at left
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
                    Collaspe = require 'mui-js/Collaspe'

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

        @demoNotifyOpenBtn1D = new Button
            text: 'Debounce'
            onClick: u.debounce(
                => @demoNotify1.show(msgIcon, 'notify per 1 seconds')
            ,   1000)

        @demoNotifyOpenBtn1D2 = new Button
            text: 'Debounce leading'
            onClick: u.debounce(
                => @demoNotify1.show(msgIcon, 'notify per 1 seconds')
            ,   1000
            ,   true)

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
                    Notify = require 'mui-js/Notify'

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
                @demoButton4.view()

            m 'li', @demoBtnGroupDoc.view()
            m 'li', @demoBtnGroup.view()
            m 'li', @demoBtnGroup2.view()

            m 'li', @demoDatePickerDoc.view()
            m 'li', @demoDatePicker1.view()
            m 'li', @demoDatePicker2.view()

            m 'li', @demoSwitchDoc.view()
            m 'li', @demoSwitch.view()

            m 'li', @demoCheckBoxDoc.view()
            m 'li', @demoCheckBox.view()

            m 'li', @demoDropDownDoc.view()
            m 'li', @demoDropDown1.view()
            m 'li', @demoDropDown2.view()
            m 'li', @demoDropDown3.view()

            m 'li', @demoModalDoc.view()
            m 'li', @demoModalOpenBtn1.view(), @demoModal1.view()
            m 'li', @demoModalOpenBtn2.view(), @demoModal2.view()

            m 'li', @demoTextInputDoc.view()
            m 'li', @demoTextInput1.view()
            m 'li', @demoTextInput2.view()

            m 'li', @demoTagInputDoc.view()
            m 'li', @demoTagInput.view()

            m 'li', @demoQuestionMarkDoc.view()
            m 'li', @demoQuestionMark.view()

            m 'li', @demoTextAreaDoc.view()
            m 'li', @demoTextArea.view()
            m 'li', @demoTextArea2.view()


            m 'li', @demoTableViewDoc.view()
            m 'li', tableView(@demoTableViewColMap, @demoTableViewData)
            m 'li', tableView(@demoTableViewColMap, @demoTableViewData, true)

            m 'li', @demoCollaspeDoc.view()
            m 'li', @demoCollaspe.view()

            m 'li', @demoNotifyDoc.view()
            m 'li', @demoNotify1.view(), @demoNotify2.view()
            m 'li'
            ,   {className: 'NotifyBtnGroup'}
            ,   @demoNotifyOpenBtn1.view()
            ,   @demoNotifyOpenBtn1D.view()
            ,   @demoNotifyOpenBtn1D2.view()
            ,   @demoNotifyOpenBtn2.view()


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
    ButtonGroup.mss
    DatePicker.mss
    Switch.mss
    CheckBox.mss
    DropDown.mss
    Modal.mss
    TextInput.mss
    TagInput.mss
    QuestionMark.mss
    TextArea.mss
    Collaspe.mss
    Notify.mss
    tableView.mss

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

    NotifyBtnGroup:
        Button:
            width: '200px'

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
