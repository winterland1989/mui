m = require 'mithril'
s = require 'mss-js'
u = require './utils'
AutoHide = require './AutoHide'

style = require './style'
i18n = require './i18n'
dateIcon = require 'mmsvg/google/msvg/action/date-range'

hourArray = (u.formatXX x for x in [0..23])
minuteArray = (u.formatXX x for x in [0..59])
secondArray = (u.formatXX x for x in [0..59])

class DatePicker
    constructor: ({
        date                          # Date
    ,   @selectTime                   # Boolean
    ,   @ifDateAvailable = (-> true)  # (Date) -> Boolean
    ,   @onSelect = u.noOp            # (Date) -> a
    }) ->
        @displayDate = new Date date
        @date = new Date date
        @init()

        @autoHideDatePicker = new AutoHide
            widget: view: =>
                m '.DatePickerWidget',
                    m '.NavBar',

                        m 'span.PreYear', onclick: @preYear, '<<'

                        m 'span.PreMonth', onclick: @preMonth, '<'

                        m 'span.CurrentMonth',
                            m 'span.CurrentYear', @displayDate.getFullYear() + '-' + (@displayDate.getMonth() + 1)

                        m 'span.NextMonth', onclick: @nextMonth, '>'

                        m 'span.NextYear', onclick: @nextYear, '>>'

                    m '.DayBar',
                        for d in i18n.dayName
                            m 'span.DayName', d

                    m '.DateList'
                    ,
                        onclick: @selectDate
                    ,
                        for d in [ 0..(@startDay + @totalDay - 1) ]
                            dObj = new Date(@displayDate)
                            dObj.setDate( d - @startDay + 1)
                            if d >= @startDay
                                m 'span.Date'
                                ,
                                    className:
                                        [
                                            if @ifDateAvailable(dObj) then 'Available' else ''
                                        ,
                                            if (@date? and
                                                dObj.getDate() == @date.getDate() and
                                                dObj.getMonth() == @date.getMonth() and
                                                dObj.getFullYear() == @date.getFullYear()
                                            )
                                                'Current'
                                            else ''
                                        ].join ' '
                                    'data-year': dObj.getFullYear()
                                    'data-month': dObj.getMonth()
                                    'data-date': dObj.getDate()

                                , d - @startDay + 1

                            else
                                m 'span.NoDate', ''

                    if @selectTime then [
                        m '.TimeBar',
                            m 'span.TimeLabel', i18n.hour
                            m 'span.TimeLabel', i18n.minute
                            m 'span.TimeLabel', i18n.second


                        m '.TimeList', onclick: @setHMS,
                            m 'ul.HourList',
                                for hour, i in hourArray then m 'li' ,
                                        config: u.scrollToView
                                        key: i
                                        className: if hour == u.formatXX @date.getHours() then 'Current' else ''
                                        'data-hour': hour
                                    , hour
                            m 'ul.MinuteList',
                                for min, i in minuteArray then m 'li' ,
                                        config: u.scrollToView
                                        key: i
                                        className: if min == u.formatXX @date.getMinutes() then 'Current' else ''
                                        'data-min': min
                                    ,   min
                            m 'ul.SecondList',
                                for second, i in secondArray then m 'li',
                                        config: u.scrollToView
                                        key: i
                                        className: if second == u.formatXX @date.getSeconds() then 'Current' else ''
                                        'data-second': second
                                    ,   second
                    ]
    init: ->
        # from which day?
        d = new Date(@displayDate)
        d.setDate(0)
        @startDay = d.getDay()
        # how many days in this month?
        d = new Date(@displayDate)
        d.setMonth(@displayDate.getMonth() + 1)
        d.setDate(0)
        @totalDay = d.getDate()

    preMonth: (e) =>
        @displayDate.setMonth(@displayDate.getMonth() - 1)
        @init()

    nextMonth: (e) =>
        @displayDate.setMonth(@displayDate.getMonth() + 1)
        @init()

    preYear: (e) =>
        @displayDate.setFullYear(@displayDate.getFullYear() - 1)
        @init()

    nextYear: (e) =>
        @displayDate.setFullYear(@displayDate.getFullYear() + 1)
        @init()

    selectDate: (e) =>
        if u.targetHasClass (u.getTarget e), 'Available'
            @date.setFullYear u.getTargetData(e, 'year')
            @date.setMonth u.getTargetData(e, 'month')
            @date.setDate u.getTargetData(e, 'date')
            @onSelect @date
            @displayDate.setDate @date.getDate()
            unless @selectTime then @autoHideDatePicker.hide()

    setHMS: (e) =>
        hour = parseInt (u.getTargetData(e, 'hour'))
        unless isNaN hour then @date.setHours hour
        min = parseInt (u.getTargetData(e, 'min'))
        unless isNaN min then @date.setMinutes min
        second = parseInt (u.getTargetData(e, 'second'))
        unless isNaN second then @date.setSeconds second
        @onSelect @date

    view: ->
        m '.DatePicker',
            m 'input.DateInput',
                readonly: true
                onclick: @autoHideDatePicker.show
                value: if @selectTime then u.formatDateWithHMS @date else u.formatDate @date
            m 'span.DateIcon', u.svg dateIcon
            @autoHideDatePicker.view()

DatePicker.mss =
    DatePicker:
        width: '250px'
        position: 'relative'
        DateInput:
            lineHeight: '2em'
            display: 'block'
            fontSize: '0.9em'
            width: '100%'
            padding: 0
            textAlign: 'center'
            border: '1px solid ' + style.border[4]
            WebkitAppearance: 'none'
            borderRadius: 0
        DateIcon:
            position: 'absolute'
            svg:
                fill: style.text[1]
                height: '1.4em'
                width: '1.4em'
                padding: '0.3em'
            top: 0
            left: 0
        DatePickerWidget:
            position: 'absolute'
            top: '1.9em'
            left: 0
            border: '1px solid ' + style.border[4]
            width: '248px'
            background: '#fff'
            zIndex: 999
            NavBar:
                padding: '0.3em 0.9em'
                textAlign: 'center'
                lineHeight: '2em'
                height: '2em'

                PreYear_PreMonth_NextMonth_NextYear:
                    display: 'inline-block'
                    borderRadius: '50%'
                    width: '2em'
                    height: '2em'
                    $hover:
                        cursor: 'pointer'
                        color: style.main[5]

                CurrentMonth:
                    display: 'inline-block'

            DayBar:
                padding: '4px 12px'
                borderBottom: '1px solid #eee'
                fontSize: '0.9em'
                span:
                    width: '32px'
                    display: 'inline-block'
                    textAlign: 'center'
                    margin: 0

            DateList:
                padding: '0px 12px 12px'
                lineHeight: '28px'

                span:
                    display: 'inline-block'
                    width: '28px'
                    height: '28px'
                    padding: '2px'
                    textAlign: 'center'
                    fontSize: '0.9em'
                    color: style.text[5]
                    margin: 0
                    borderRadius: '50%'

                Current:
                    color: '#fff !important'
                    background: style.main[4] + ' !important'

                Available:
                    color: style.text[0]
                    $hover:
                        color: '#fff'
                        cursor: 'pointer'
                        background: style.main[5]

            TimeBar:
                borderTop: '1px solid ' + style.border[4]
                TimeLabel:
                    padding: '8px 0'
                    fontSize: '0.9em'
                    display: 'inline-block'
                    width: '80px'
                    textAlign: 'center'

            TimeList:
                HourList_MinuteList_SecondList:
                    position: 'relative'
                    padding: 0
                    margin: 0
                    marginBottom: '8px'
                    display: 'inline-block'
                    height: '80px'
                    width: '80px'
                    overflow: 'auto'
                    listStyle: 'none'
                    li:
                        fontSize: '0.9em'
                        textAlign: 'center'
                        margin: '0.2em'
                        $hover:
                            color: style.text[8]
                            background: style.main[5]
                    Current:
                        color: style.text[8]
                        background: style.main[4]


module.exports = DatePicker
