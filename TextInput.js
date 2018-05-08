// Generated by CoffeeScript 1.12.7
(function() {
  var TextInput, m, s, style, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = require('mithril');

  s = require('mss-js');

  style = require('./style');

  u = require('./utils');

  TextInput = (function() {
    function TextInput(arg) {
      var ref, ref1, ref2, ref3, ref4, ref5, ref6;
      this.content = (ref = arg.content) != null ? ref : '', this.disabled = (ref1 = arg.disabled) != null ? ref1 : false, this.placeholder = (ref2 = arg.placeholder) != null ? ref2 : '', this.onChange = (ref3 = arg.onChange) != null ? ref3 : u.noOp, this.onKeyup = (ref4 = arg.onKeyup) != null ? ref4 : u.noOp, this.onEnter = (ref5 = arg.onEnter) != null ? ref5 : u.noOp, this.onClick = (ref6 = arg.onClick) != null ? ref6 : u.noOp;
      this.onkeyupInternal = bind(this.onkeyupInternal, this);
      this.onChangeInternal = bind(this.onChangeInternal, this);
      this.validationMsg = '';
    }

    TextInput.prototype.submit = function() {
      if (this.validationMsg === '') {
        return this.content;
      } else {
        return new Error(this.validationMsg);
      }
    };

    TextInput.prototype.validateInternal = function(c) {};

    TextInput.prototype.onChangeInternal = function(e) {
      var c, err;
      c = (u.getTarget(e)).value;
      err = this.onChange(c);
      this.validationMsg = '';
      if (err instanceof Error) {
        this.validationMsg = err.message;
      }
      return this.content = c;
    };

    TextInput.prototype.onkeyupInternal = function(e) {
      var c, err;
      c = (u.getTarget(e)).value;
      this.content = c;
      if (e.keyCode === 13 || e.key === "Enter") {
        if (this.validationMsg === '') {
          err = this.onEnter(this.content);
          if (err instanceof Error) {
            return this.validationMsg = err.message;
          }
        }
      } else {
        err = this.onKeyup(c);
        this.validationMsg = '';
        if (err instanceof Error) {
          return this.validationMsg = err.message;
        }
      }
    };

    TextInput.prototype.view = function() {
      return m('.TextInput', m('input.Input', {
        disabled: this.disabled,
        onchange: this.onChangeInternal,
        onkeyup: this.onkeyupInternal,
        value: this.content,
        placeholder: this.placeholder,
        onclick: this.onClick
      }), this.validationMsg !== '' ? m('.ValidationMsg', this.validationMsg) : void 0);
    };

    return TextInput;

  })();

  TextInput.mss = {
    TextInput: s.LineSize('1.93em', '1em')({
      width: '200px',
      position: 'relative',
      Input: {
        display: 'block',
        border: '1px solid ' + style.border[4],
        width: '100%',
        height: '100%',
        fontSize: '1em',
        padding: '0 0.4em',
        WebkitAppearance: 'none',
        borderRadius: 0
      },
      ValidationMsg: {
        background: style.warn[5],
        color: style.text[8],
        position: 'absolute',
        top: 0,
        left: '100%',
        textAlign: 'center',
        width: '200px',
        zIndex: 99,
        $before: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-2em',
          width: 0,
          height: 0,
          border: '1em solid transparent',
          borderRight: '1em solid ' + style.warn[5]
        }
      }
    })
  };

  module.exports = TextInput;

}).call(this);
