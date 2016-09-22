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
