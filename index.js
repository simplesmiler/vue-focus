import Vue from 'vue';

export var version = '2.0.0-rc1';

var compatible = (/^2\./).test(Vue.version);
if (!compatible) {
  Vue.util.warn('VueFocus ' + version + ' only supports Vue 2.x, and does not support Vue ' + Vue.version);
}

export var focus = {
  inserted: function(el, binding) {
    if (binding.value) el.focus();
    else el.blur();
  },

  componentUpdated: function(el, binding) {
    if (binding.value) el.focus();
    else el.blur();
  },
};

export var mixin = {
  directives: {
    focus: focus,
  },
};
