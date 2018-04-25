// Generated by CoffeeScript 1.12.7
(function() {
  var TagInput, TextInput, m, s, style, u,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  m = require('mithril');

  s = require('mss-js');

  style = require('./style');

  u = require('./utils');

  TextInput = require('./TextInput');

  TagInput = (function() {
    function TagInput(arg) {
      var placeholder, ref, ref1, ref2, ref3;
      this.tagList = (ref = arg.tagList) != null ? ref : [], placeholder = (ref1 = arg.placeholder) != null ? ref1 : '', this.onAdd = (ref2 = arg.onAdd) != null ? ref2 : u.noOp, this.onDel = (ref3 = arg.onDel) != null ? ref3 : u.noOp;
      this.delTag = bind(this.delTag, this);
      this.addTag = bind(this.addTag, this);
      this.tagInput = new TextInput({
        content: '',
        placeholder: placeholder,
        onEnter: this.addTag
      });
    }

    TagInput.prototype.addTag = function(tag) {
      if ((this.tagList.indexOf(tag) === -1) && (tag !== '')) {
        this.tagList.push(tag);
        this.onAdd(tag);
        return this.tagInput.content = '';
      }
    };

    TagInput.prototype.delTag = function(e) {
      var i, tag;
      tag = u.getTargetData(e, 'tag');
      i = this.tagList.indexOf(tag);
      if (i !== -1) {
        this.tagList.splice(i, 1);
        return this.onDel(i);
      }
    };

    TagInput.prototype.view = function() {
      var tag;
      return m('.TagInput', (function() {
        var j, len, ref, results;
        ref = this.tagList;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          tag = ref[j];
          results.push(m('.TagItem', m('span', tag), m('.DelBtn', {
            'data-tag': tag,
            onclick: this.delTag
          }, '✕')));
        }
        return results;
      }).call(this), this.tagInput.view());
    };

    return TagInput;

  })();

  TagInput.mss = s.merge([
    TextInput.mss, {
      TagInput: {
        TagItem: {
          display: 'inline-block',
          border: '1px solid ' + style.border[4],
          color: style.text[0],
          padding: '4px 12px',
          margin: '0 4px',
          DelBtn: {
            display: 'inline-block',
            marginLeft: '12px',
            color: style.main[4],
            cursor: 'pointer',
            $hover: {
              color: style.warn[4]
            }
          }
        },
        TextInput: {
          display: 'inline-block',
          width: '100px'
        }
      }
    }
  ]);

  module.exports = TagInput;

}).call(this);
