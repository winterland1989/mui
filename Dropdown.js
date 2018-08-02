// Generated by CoffeeScript 1.12.7
(function() {
  var AutoHide, Dropdown, downIcon, m, s, style, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = require('mithril');

  s = require('mss-js');

  downIcon = require('mmsvg/google/msvg/navigation/expand-more');

  style = require('./style');

  u = require('./utils');

  AutoHide = require('./AutoHide');

  Dropdown = (function() {
    function Dropdown(arg) {
      var ref, ref1, ref2, ref3, ref4;
      this.itemArray = arg.itemArray, this.currentIndex = arg.currentIndex, this.placeholder = (ref = arg.placeholder) != null ? ref : '', this.onSelect = (ref1 = arg.onSelect) != null ? ref1 : u.noOp, this.ifAvailable = (ref2 = arg.ifAvailable) != null ? ref2 : (function() {
        return true;
      }), this.allowEmptySelect = (ref3 = arg.allowEmptySelect) != null ? ref3 : true, this.showDownArrow = (ref4 = arg.showDownArrow) != null ? ref4 : true;
      this.onSelectInternal = bind(this.onSelectInternal, this);
      this.autoComplete = bind(this.autoComplete, this);
      if ((this.allowEmptySelect === false) && !this.itemArray[this.currentIndex]) {
        throw "currentIndex is illegal";
      }
      this.filter = '';
      this.autoHideDropDown = new AutoHide({
        onHide: (function(_this) {
          return function() {
            return _this.filter = '';
          };
        })(this),
        widget: {
          view: (function(_this) {
            return function() {
              var i, item;
              return m('ul.DropdownList', {
                onclick: _this.onSelectInternal
              }, (function() {
                var j, len, ref5, results;
                ref5 = this.itemArray;
                results = [];
                for (i = j = 0, len = ref5.length; j < len; i = ++j) {
                  item = ref5[i];
                  if ((item.indexOf(this.filter)) !== -1) {
                    results.push(m('li.DropdownItem', {
                      oncreate: u.scrollToView,
                      key: i,
                      className: (this.currentIndex === i ? 'Current ' : '') + (this.ifAvailable(item, i) ? 'Available' : ''),
                      'data-index': i,
                      'data-content': item
                    }, item));
                  }
                }
                return results;
              }).call(_this));
            };
          })(this)
        }
      });
    }

    Dropdown.prototype.autoComplete = function(e) {
      this.filter = (u.getTarget(e)).value;
      if (this.filter === '') {
        return this.currentIndex = void 0;
      }
    };

    Dropdown.prototype.onSelectInternal = function(e) {
      var content, index;
      if (u.targetHasClass(u.getTarget(e), 'Available')) {
        index = parseInt(u.getTargetData(e, 'index'));
        content = u.getTargetData(e, 'content');
        if (!isNaN(index)) {
          this.currentIndex = index;
          this.filter = '';
          this.autoHideDropDown.hide();
          this.onSelect(content, index);
        }
      }
      return u.cancelBubble(e);
    };

    Dropdown.prototype.view = function() {
      return m('div', {
        onclick: this.autoHideDropDown.show,
        className: this.autoHideDropDown.showWidget ? "Dropdown Expanded" : "Dropdown"
      }, m('input.DropdownInput', {
        disabled: this.allowEmptySelect ? '' : 'true',
        onkeyup: this.autoComplete,
        placeholder: this.placeholder,
        value: this.filter ? this.filter : this.currentIndex != null ? this.itemArray[this.currentIndex] : ''
      }), (this.showDownArrow = true) ? m('.DownArrow', downIcon) : void 0, this.autoHideDropDown.view());
    };

    return Dropdown;

  })();

  Dropdown.mss = {
    Dropdown: {
      position: 'relative',
      width: '200px',
      DropdownInput: {
        display: 'block',
        lineHeight: '2em',
        fontSize: '0.9em',
        width: '100%',
        padding: 0,
        textAlign: 'center',
        border: '1px solid ' + style.border[4],
        WebkitAppearance: 'none',
        borderRadius: 0
      },
      'DropdownInput[disabled]': {
        cursor: 'pointer'
      },
      DownArrow: {
        svg: {
          fill: '#999'
        },
        position: 'absolute',
        top: '0.1em',
        right: '0.3em',
        transition: 'transform .3s ease'
      },
      DropdownList: {
        position: 'absolute',
        top: '1.9em',
        border: '1px solid #ccc',
        width: '198px',
        height: '200px',
        margin: 0,
        padding: 0,
        listStyle: 'none',
        background: '#fff',
        overflowY: 'auto',
        zIndex: 999,
        DropdownItem: s.LineSize('2em', '0.9em')({
          textAlign: 'center',
          overflowX: 'hidden',
          padding: '0 4px',
          margin: 0,
          color: style.text[5],
          $hover: {
            cursor: 'pointer',
            background: style.main[5],
            color: style.text[8]
          }
        }),
        Available: {
          color: style.text[0]
        },
        Current: {
          background: style.main[4],
          color: style.text[8]
        }
      }
    },
    Expanded: {
      DownArrow: {
        transform: 'rotate(180deg)'
      }
    }
  };

  module.exports = Dropdown;

}).call(this);
