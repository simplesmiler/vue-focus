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

- vue: ^2.0.0

## Install

From npm:

``` sh
$ npm install vue-focus --save
```

From CDN:

``` html
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue-focus/2.0.0-rc1/vue-focus.js"></script>
<!-- OR -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue-focus/2.0.0-rc1/vue-focus.min.js"></script>
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

## Notes

Form elements are not the only elements that are able to receive focus. The list also includes links, element with `tabindex` attribute set and elements with `contentEditable` set to `true`.

## License

[MIT](https://opensource.org/licenses/MIT)
