# vue-focus

> A reusable focus directive for reusable [Vue.js](https://github.com/vuejs/vue) components

[![npm version](https://img.shields.io/npm/v/vue-focus.svg)](https://www.npmjs.com/package/vue-focus)

## Overview

It can be tricky to manage input focus. You always have to fall back to accessing DOM elements and calling `.focus` or `.blur` on them.

Well not anymore. `vue-focus` lets you manage focus from the safety of your view model.

[Check out the examples](https://jsfiddle.net/simplesmiler/k5vxp69o/), [read the docs](#api) or [file an issue](https://github.com/simplesmiler/vue-focus/issues).

## Use cases

- Focus the field when the modal windows appears
- Track the focus to show a hint for the focused field
- Move between fields with cursor keys
- Implement custom focus-related controls (e.g labels)

## Requirements

- vue: ^1.0.0

## Install

From npm:

``` sh
$ npm install vue-focus@^1.0 --save
```

From CDN:

``` html
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue-focus/1.0.0/vue-focus.js"></script>
<!-- OR -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue-focus/1.0.0/vue-focus.min.js"></script>
```

## API

### `focus`

A directive that binds focus to the expression in a one-way manner, so that the element recieves focus when the expression becomes `truthy` and loses focus when the expression becomes `falsy`.

``` js
import { focus } from 'vue-focus';

export default {
  directives: { focus: focus },
  template: '<input type="text" v-focus="focused" @focus="focused = true" @blur="focused = false">',
  data: function() {
    return {
      focused: false,
    };
  },
};
```

### `focus-model`

> NOTE: this directive is deprecated. Use `v-focus="expression" @focus="expression = true" @blur="expression = false"` instead.

A directive that binds focus to the expression in a two-way manner, so that the element recieves focus when you change the bound value to `true` and loses focus when you change the bound value to `false`, **and vice versa**, sets the bound value to `true` when element recieves focus and sets the bound value to `false` when element loses focus. It takes a single argument: an expression to be bound.

> NOTE: This is a two-way bound directive. If you need a one-way bound version, please refer to [focus](#focus).

> NOTE: The expression has to be settable, and has to evaluate to a boolean value.

``` js
import { focusModel } from 'vue-focus';

export default {
  directives: { focusModel: focusModel },
  template: '<input type="text" v-focus-model="focused">',
  data: function() {
    return {
      focused: false,
    };
  },
};
```

### `focus-auto`

> NOTE: this directive is deprecated. Use `v-focus="true"` instead.

A directive that makes the element gain focus whenever it enters the DOM (either via initial costruction or by the means of `:is`, `v-if` or `v-for`). It takes no arguments.

> NOTE: This is a reactive replacement for the native html attribute `autofocus`, which does not work after page has finished loading.

``` js
import { focusAuto } from 'vue-focus';

export default {
  directives: { focusAuto: focusAuto },
  template: '<input type="text" v-focus-auto>',
};
```

### `mixin`

A mixin that makes the `v-focus` directive available to the component under the default name.

``` js
import { mixin as focusMixin }  from 'vue-focus';

export default {
  mixins: [ focusMixin ],
  template: '<input type="text" v-focus="focused" @focus="focused = true" @blur="focused = false">',
  data: function() {
    return {
      focused: false,
    };
  },
};
```

## Caveats

1. Although you can write an input that gains focus immediately after loosing it, this is not recommended, as two such inputs will fall into infinite recursion and freeze the browser.
2. Prior to `vue@1.0` views were able to inherit assets from the parent views, which made it possible to define the directive on the root view and have it available across the whole view hierarchy. Since `vue@1.0` this is not possible. If you still want to define the directive application-wide, you should `Vue.directive('<directive-name>', <directive>);` in your application entry point for every directive you need. But bear in mind that this introduces implicit dependency for your components, making them less reusable.

## Notes

Form elements are not the only elements that are able to receive focus. The list also includes links, element with `tabindex` attribute set and elements with `contentEditable` set to `true`.

## License

[MIT](https://opensource.org/licenses/MIT)
