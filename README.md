# vue-focus

> A set of reusable focus directives for reusable [Vue.js](https://github.com/vuejs/vue) components

## Overview

@TODO: write overview

## Requirements

- vue: ^1.0.0

## Install

From npm:

``` sh
$ npm install vue-focus --save
```

From CDN:

``` html
<script src="https://cdn.rawgit.com/simplesmiler/vue-focus/0.1.0/dist/vue-focus.js"></script>
<!-- OR -->
<script src="https://cdn.rawgit.com/simplesmiler/vue-focus/0.1.0/dist/vue-focus.min.js"></script>
```

## Usage

1. Make directives available to your component (either by mixin or one by one)
2. Use directives on the element

## API

### `focus`

A directive that binds focus to the expression in a one-way manner, so that the element recieves focus when you set the bound value to be `truthy` and loses focus when you set the bound value to be `falsy`. It takes a single argument: an expression to be bound.

> NOTE: This is a one-way bound directive. If you need a two-way bound version, please refer to [focus-model](#focus-model).

``` js
import { focus } from 'vue-focus';

export default {
  directives: { focus: focus },
  template: '<input type="text" v-for="item in items" v-model="item.value" v-focus="$index === focused">',
  data: function() {
    return {
      focused: 0,
      items: [
        { value: 'hello' },
        { value: 'world' },
      ],
    };
  },
};
```

### `focus-model`

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

A mixin that includes all the directives at once, and makes them available to the component under their default names.

``` js
import VueFocus from 'vue-focus';

export default {
  mixins: [ VueFocus.mixin ],
  template: '<input type="text" v-focus-model="focused" v-focus-auto>',
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
