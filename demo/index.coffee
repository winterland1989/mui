m = require 'mithril'
s = require 'mss-js'
buildIcon = require 'mmsvg/google/msvg/action/build'

Button = require '../Button'
DatePicker = require '../DatePicker'
Switch = require '../Switch'
DropDown = require '../Dropdown'
Modal = require '../Modal'
TextInput = require '../TextInput'


class Demo
    constructor: ->
        @demoButton = new Button
            text: 'Build'
            prefix: buildIcon
        @demoDatePicker = new DatePicker
            date: new Date()
        @demoSwitch = new Switch
            enable: true
        @demoDropDown = new DropDown
            itemArray: ['foo', 'bar', '~~~']
            currentIndex: 2

        @demoModal1 = new Modal
            clickToHide: true
            widget: view: ->
                m 'h2', 'Close anywhere  else to close'

        @demoModal2 = new Modal
            clickToHide: false

        @demoModalOpenBtn1 = new Button
            text: 'Open a modal widget'
            onClick: @demoModal1.show

        @demoModalOpenBtn2 = new Button
            text: 'Open a modal widget'
            onClick: @demoModal2.show

        @demoModalCloseBtn = new Button
            text: 'Hide this modal widget'
            onClick: @demoModal2.hide

        @demoModal2.widget = @demoModalCloseBtn

        @demoTextInput = new TextInput
            onChange: (str) ->
                if str != 'ya!'
                    new Error 'please input "ya!"'

    view: ->

        m 'ul.Demo',
            m 'li', @demoButton.view()
            m 'li', @demoDatePicker.view()
            m 'li', @demoSwitch.view()
            m 'li', @demoDropDown.view()
            m 'li', @demoModalOpenBtn1.view(), @demoModal1.view()
            m 'li', @demoModalOpenBtn2.view(), @demoModal2.view()
            m 'li', @demoTextInput.view()


s.tag s.merge [
    Button.mss
    DatePicker.mss
    Switch.mss
    DropDown.mss
    Modal.mss
    TextInput.mss

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

]

m.mount document.body, new Demo()
