m = require 'mithril'
s = require 'mss-js'

u = require './utils'
style = require './style'

tableView = (colMap, rowArray, verticalHeader = false) ->
    if verticalHeader
        m 'table.TableView',
            for k, v of colMap
                m 'tr',
                    m 'th', v
                    for d, i in rowArray
                        m 'td', if d[k]? then m.trust d[k].toString() else ''

    else
        m 'table.TableView',
            m 'thead',
                m 'tr',
                    for k, v of colMap then m 'th', v

            m 'tbody',
                for d, i in rowArray
                    m 'tr', key: i,
                        for k of colMap

                            m 'td', if d[k]? then m.trust d[k].toString() else ''

tableView.mss =
    TableView:
        width: '100%'
        margin: '14px 0'
        borderCollapse: 'collapse'
        th_td:
            border: '1px solid' + style.border[4]
            padding: '4px'
            textAlign: 'center'
            color: style.text[1]
            a:
                color: style.text[3]
        th:
            backgroundColor: style.main[4]
            color: style.text[8]
            fontWeight: 'normal'

        'tr:nth-child(even)':
            backgroundColor: style.border[8]

module.exports = tableView
