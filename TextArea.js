// Generated by CoffeeScript 2.3.1
(function() {
  var TextArea, m, s, style, u;

  m = require('mithril');

  s = require('mss-js');

  style = require('./style');

  u = require('./utils');

  TextArea = class TextArea {
    constructor({content: content = '', disabled: disabled = false, placeholder: placeholder = '', onChange: onChange = u.noOp, onKeydown: onKeydown = u.noOp, onKeyup: onKeyup = u.noOp, allowTab: allowTab = false, resize: resize = 'none', rows: rows = 5}) { // String // Boolean // String // (String) -> a | Error // (String) -> a | Error // (String) -> a | Error // Boolean // none | both | horizontal | vertical // Number
      // an easier way to control height instead of inject MSS
      this.onChangeInternal = this.onChangeInternal.bind(this);
      this.onkeyupInternal = this.onkeyupInternal.bind(this);
      this.onkeydownInternal = this.onkeydownInternal.bind(this);
      this.content = content;
      this.disabled = disabled;
      this.placeholder = placeholder;
      this.onChange = onChange;
      // triggered on Blur or user stroke Enter
      this.onKeydown = onKeydown;
      // triggered when user press key
      this.onKeyup = onKeyup;
      // triggered when user release key
      this.allowTab = allowTab;
      // allow user input `\t` with tab key
      this.resize = resize;
      // textarea resize attribute
      this.rows = rows;
      this.validationMsg = ''; // String
    }

    submit() {
      if (this.validationMsg === '') {
        return this.content;
      } else {
        return new Error(this.validationMsg);
      }
    }

    validateInternal(c) {}

    onChangeInternal(e) {
      var c, err;
      c = (u.getTarget(e)).value;
      err = this.onChange(c);
      this.validationMsg = '';
      if (err instanceof Error) {
        this.validationMsg = err.message;
      }
      return this.content = c;
    }

    onkeyupInternal(e) {
      var c, err;
      c = (u.getTarget(e)).value;
      this.content = c;
      err = this.onKeyup(c);
      this.validationMsg = '';
      if (err instanceof Error) {
        return this.validationMsg = err.message;
      }
    }

    onkeydownInternal(e) {
      var c, end, err, keyCode, start, target;
      c = (u.getTarget(e)).value;
      if (this.allowTab) {
        keyCode = e.keyCode || e.which;
        if (keyCode === 9) {
          e.preventDefault();
          target = u.getTarget(e);
          start = target.selectionStart;
          end = target.selectionEnd;
          this.content = c.substring(0, start) + '\t' + c.substring(end);
          target.selectionStart = target.selectionEnd = start + 1;
        }
      } else {
        this.content = c;
      }
      err = this.onKeydown(this.content);
      this.validationMsg = '';
      if (err instanceof Error) {
        return this.validationMsg = err.message;
      }
    }

    view() {
      return m('.TextArea', m('textarea.Input', {
        disabled: this.disabled,
        onchange: this.onChangeInternal,
        onkeyup: this.onkeyupInternal,
        onkeydown: this.onkeydownInternal,
        value: this.content,
        placeholder: this.placeholder,
        rows: this.rows,
        style: {
          resize: this.resize
        }
      }), this.validationMsg !== '' ? m('.ValidationMsg', this.validationMsg) : void 0);
    }

  };

  TextArea.mss = {
    TextArea: {
      // why 1.93em you may ask?
      // because it will align Dropdown, TextArea and anyother things nicely
      position: 'relative',
      width: '400px',
      Input: {
        display: 'block',
        border: '1px solid ' + style.border[4],
        fontSize: '1em',
        padding: '0 0.4em',
        WebkitAppearance: 'none',
        borderRadius: 0,
        width: '100%'
      },
      ValidationMsg: s.LineSize('1.93em', '1em')({
        background: style.warn[5],
        color: style.text[8],
        position: 'absolute',
        bottom: 0,
        left: 0,
        textAlign: 'center',
        zIndex: 99,
        width: '100%'
      })
    }
  };

  module.exports = TextArea;

}).call(this);
