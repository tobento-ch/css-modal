# CSS Modals

The modals.css provides a classic modal, in which you can include any content you want. In addition, the modals.js provides logic to open and close modals.

## Table of Contents

- [Getting started](#getting-started)
    - [Browser support](#browser-support)
	- [Import Files](#import-files)
- [Documentation](#documentation)
    - [Css](#css)
        - [Basic Usage](#basic-usage)
        - [Sizing](#sizing)
        - [Positions](#positions)
        - [Animations](#animations)
    - [Javascript](#javascript)
        - [Register](#register)
        - [Methods](#methods)
        - [Events](#events)
- [Credits](#credits)
___

# Getting started

## Browser support

Modern browser only.

## Import Files

```html
<link href="modals.css" rel="stylesheet" type="text/css">
<script src="modals.js" type="module"></script>
```

# Documentation

You may visit the [**docs.tobento.ch/css-modal**](https://docs.tobento.ch/css-modal) page for documentation with demo.

## Css

### Basic Usage

The basic modal structure is:

```html
<div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="modal-head">Head</div>
        <div class="modal-body">Body</div>
        <div class="modal-foot">Foot</div>
    </div>
</div>
```

The minimal modal structure is:

```html
<div class="modal">
    <div class="modal-content">
        <div class="modal-body">Body</div>
    </div>
</div>
```

To activate the modal, just add the ```.active``` class on the ```.modal``` container. The provided modal.js file implements the logic to open, close and animate the modals.

```html
<div class="modal active">
    <div class="modal-content">
        <div class="modal-body">Body</div>
    </div>
</div>
```

### Sizing

By default, the modal has full width size. You may apply one of the following sizes:

* ```modal-s``` is of width ```16rem```
* ```modal-m``` is of width ```32rem```
* ```modal-l``` is of width ```64rem```
* ```modal-full``` is full width and height
* ```modal-tablet-full``` is full width and height on tablets and mobile
* ```modal-mobile-full``` is full width and height on mobile


```html
<div class="modal">
    <div class="modal-content modal-m">
        <div class="modal-body">Body</div>
    </div>
</div>
```

You may combine the following sizes:

```html
<div class="modal">
    <div class="modal-content modal-m modal-tablet-full">
        <div class="modal-body">Body</div>
    </div>
</div>
```

If you are using the [basis.css - Sizing](https://github.com/tobento-ch/css-basis#sizing) you may use it too.

### Positions

By default, the modal is horizontal and vertical centered. You may combine the horizontal and vertical classes.

Modal Horizontal Alignment:

* ```left```
* ```right```

Modal Vertical Alignment:

* ```top```
* ```bottom```

Example bottom right aligned:

```html
<div class="modal bottom right">
    <div class="modal-content">
        <div class="modal-body">Body</div>
    </div>
</div>
```

Example top centered aligned:

```html
<div class="modal top">
    <div class="modal-content">
        <div class="modal-body">Body</div>
    </div>
</div>
```

### Animations

Available Animations:

* ```modal-fade```
* ```modal-scale```
* ```modal-swing```

Example:

```html
<div class="modal modal-fade">
    <div class="modal-content">
        <div class="modal-body">Body</div>
    </div>
</div>
```

## Javascript

### Register

The Html markup for registering a modal is:

```html
<!-- trigger button -->
<span class="button" data-modal-trigger="foo">Open modal</span>

<!-- related modal -->
<div class="modal" data-modal='{"id": "foo"}'>
    <div class="modal-content">
        <div class="modal-body">Body</div>
    </div>
</div>
```

You may add the ```modal-close``` class to any tag for closing the modal:

```html
<div class="modal" data-modal='{"id": "foo"}'>
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="modal-head"><span class="button modal-close">close</span></div>
        <div class="modal-body">Body</div>
        <div class="modal-foot"><span class="button modal-close">close</span></div>
    </div>
</div>
```

**Options:**

```html
<div class="modal" data-modal='{"id": "foo", "scroll": "hidden", "closeTriggers": ".modal-close"}'>
    <div class="modal-content">
        <div class="modal-body">Body</div>
    </div>
</div>
```

| Option | Value | Description |
| --- | --- | --- |
| ```"scroll"``` | ```"hidden"```, default | Disables scroll, keeping scrollbar hidden. |
| ```"scroll"``` | ```"visible"``` | Disables scroll, keeping scrollbar visible. |
| ```"scroll"``` | ```null``` | Without disable scroll. |
| ```"closeTriggers"``` | ```".modal-background, .modal-close"```, default | The trigger classes to close the modal. |

### Methods

You may import the modals module and use its methods:

```html
<script type="module">
    import modals from "modals.js";

    document.addEventListener('DOMContentLoaded', (e) => {
        // get a modal by id:
        const modal = modals.get('ID');
        
        // open modal:
        modal.open();
        
        // close modal:
        modal.close();
        
        // you may check if a modal exists:
        if (modals.has('ID')) {
            modals.get('ID').open();
        }        
    });
</script>
```

### Events

| Event |  Description |
| --- | --- |
| ```open``` | This event is fired **before** the modal is opened. |
| ```opened``` | This event is fired **after** the modal is opened. |
| ```close``` | This event is fired **before** the modal is closed. |
| ```closed``` | This event is fired **after** the modal is closed. |

```js
modals.get('ID').listen('open', (modal) => {
    modal.modalEl.querySelector('.modal-body').innerHTML = 'New Body';
});
```

# Credits

- [Tobias Strub](https://www.tobento.ch)
- [All Contributors](../../contributors)