# get event's target
getTarget = (event) -> elem = event.target || event.srcElement

# get even's target's data-xxx
getTargetData = (event, dataStr) ->
    elem = event.target || event.srcElement
    if elem.dataset? then elem.dataset[dataStr]
    else elem.getAttribute('data-'+ dataStr)

# get even's current target's data-xxx
getCurrentTargetData = (event, dataStr) ->
    elem = event.currentTarget
    if elem.dataset? then elem.dataset[dataStr]
    else elem.getAttribute('data-'+ dataStr)

targetHasClass = (elem, str) ->
    (elem.className.indexOf str) != -1

# cancelBubble
cancelBubble = (e) ->
    # for IE
    if e.cancelBubble == false
        e.cancelBubble = true
    # others
    e.stopPropagation?()
    false

# clear Date's hour minute and second
clearDateHMS = (date) ->
    date.setHours 0
    date.setMinutes 0
    date.setSeconds 0
    date

# format Date to yyyy-mm-dd
formatDate = (date) ->
    yyyy = date.getFullYear()
    mm = (date.getMonth() + 1)
    dd = date.getDate()

    yyyy + '-' + (formatXX mm) + '-' + (formatXX dd)

# format Date to yyyy-mm-dd hh:mm:ss
formatDateWithHMS = (date) ->
    hh = date.getHours()
    mm = date.getMinutes()
    ss = date.getSeconds()

    (formatDate date) + ' ' + (formatXX hh) + ':' + (formatXX mm) + ':' + (formatXX ss)

# parse yyyy-mm-dd hh:mm:ss
# parse yyyy-mm-dd
parseDateWithHMS = (dateString) ->
    [dateStr, timeStr] = dateString.split ' '
    date = new Date dateStr
    if timeStr?
        [hh, mm, ss] = timeStr.split ':'
        date.setHours(parseInt hh)
        date.setMinutes(parseInt mm)
        date.setSeconds(parseInt ss)
    date

# helper to format number to 2 digit
formatXX = (x) -> if x < 10 then '0' + x.toString() else x.toString()

module.exports = {
    getTarget
,   getTargetData
,   getCurrentTargetData
,   targetHasClass
,   cancelBubble
,   clearDateHMS
,   formatXX
,   formatDate
,   formatDateWithHMS
,   parseDateWithHMS
}
