import Vue from 'vue';
import { util } from 'vue';

// @NOTE: We have to use Vue.nextTick because the element might not be
//        present at the time model changes, but will be in the next batch.
//        But because we use Vue.nextTick, the directive may already be unbound
//        by the time the callback executes, so we have to make sure it was not.

export var focus = {
  priority: 1000,

  bind: function() {
    var self = this;
    this.bound = true;

    this.focus = function() {
      if (self.bound === true) {
        self.el.focus();
      }
    };

    this.blur = function() {
      if (self.bound === true) {
        self.el.blur();
      }
    };
  },

  update: function(value) {
    if (value) {
      Vue.nextTick(this.focus);
    } else {
      Vue.nextTick(this.blur);
    }
  },

  unbind: function() {
    this.bound = false;
  },
};

export var focusModel = {
  twoWay: true,
  priority: 1000,

  bind: function() {
    var self = this;
    this.bound = true;

    this.focus = function() {
      if (self.bound === true) {
        self.el.focus();
      }
    };

    this.blur = function() {
      if (self.bound === true) {
        self.el.blur();
      }
    };

    this.focusHandler = function() {
      self.set(true);
    };

    this.blurHandler = function() {
      self.set(false);
    };

    util.on(this.el, 'focus', this.focusHandler);
    util.on(this.el, 'blur', this.blurHandler);
  },

  update: function(value) {
    if (value === true) {
      Vue.nextTick(this.focus);
    } else if (value === false) {
      Vue.nextTick(this.blur);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        util.warn(
          this.name + '="' +
          this.expression + '" expects a boolean value, ' +
          'got ' + JSON.stringify(value)
        );
      }
    }
  },

  unbind: function() {
    util.off(this.el, 'focus', this.focusHandler);
    util.off(this.el, 'blur', this.blurHandler);
    this.bound = false;
  },
};

export var focusAuto = {
  priority: 100,
  bind: function() {
    var self = this;
    this.bound = true;

    Vue.nextTick(function() {
      if (self.bound === true) {
        self.el.focus();
      }
    });
  },
  unbind: function(){
    this.bound = false;
  },
};

export var mixin = {
  directives: {
    focus: focus,
    focusModel: focusModel,
    focusAuto: focusAuto,
  },
};
