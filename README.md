# Cordova - TabrisJS CardView plugin

for Android and iOS, by [Joko Rivai](https://github.com/jokorivai)


## 0. Index

1. [Description](#1-description)
2. [Screenshots](#2-screenshots)
3. [Installation](#3-installation)
	3. [Automatically (Cordoa CLI)](#automatically-cordova-cli)
	3. [Manually](#manually)
4. [Usage](#4-usage)
5. [Credits](#5-credits)
6. [Changelog](#6-changelog)

## 1. Description

This plugin allows you to create card view using plain javascript. Only for TabrisJS apps. Supported on Android and iOS (as platforms supported by TabrisJS).
Currently [TabrisJS](https://tabrisjs.com/) is not supporting CardView yet, so this plugin may help you create similar view based on TabrisJS widget library.
* You can specify card's title, image and text to show.
* You can specify actions for the card. Actions are tabris.Buttons and may be added as much as needed, but please consider card space available for them.
* Each action can have callback 
* You can change the card's title, image and text at runtime.
* Compatible with [Cordova CLI](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html).

## 2. Screenshots

iOS

Not yet.


Android

![ScreenShot1](screenshots/MI_20161011_160604.png)

![ScreenShot2](screenshots/MI_20161011_160630.png)


## 3. Installation

### Automatically (Cordova CLI)
Cordova - TabrisJS CardView plugin is compatible with [Cordova CLI](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html), here's how it works with the CLI (backup your project first!):

Using the Cordova CLI and the [Cordova Plugin Registry](http://plugins.cordova.io)
```
$ cordova plugin add cordova-plugin-tabrisjs-card
```

Or instal using Git repository
```
$ cordova plugin add https://github.com/jokorivai/cordova-plugin-tabrisjs-card.git
```

tabrisjscard.js is brought in automatically. There is no need to change or add anything in your code to make it available.
Please note that this plugin is NOT for HTML/WebView based Cordova apps. This plugin is ONLY for TabrisJS Cordova apps.

To create card, call
```js
// reference to the plugin
var createCard = window.tabrisJsPlugins.cards.createCard;
// create card:
createCard(...);
```

Or
```js
window.tabrisJsPlugins.cards.createCard(...);
```

### Manually
You'd better use the CLI, but here goes:

Grab a copy of `tabrisjscard.js`, from `extracted-zip\www\` and put it to your project's `www` folder and reference it:
```js
var createCard = require('./tabrisjscard.js').createCard;
```

## 4. Usage

### Creating a card
Cards created by this plugin are TabrisJS UI widget composite. The composite will be returned by `createCard()` function and can be manipulated as usual TabrisJS UI widgets.

To create plain card on a page (top is always 0 with 3dp margin):
```js
var card = createCard('Card Content', 'Card Title'}).appendTo(page);
```



* show(message, duration, position)
* duration: 'short', 'long', '3000', 900 (the latter are milliseconds)
* position: 'top', 'center', 'bottom'

You can also use any of these convenience methods:
* showShortTop(message)
* showShortCenter(message)
* showShortBottom(message)
* showLongTop(message)
* showLongCenter(message)
* showLongBottom(message)

You can copy-paste these lines of code for a quick test:
```html
<button onclick="window.plugins.toast.showShortTop('Hello there!', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})">Toast showShortTop</button>
<button onclick="window.plugins.toast.showLongBottom('Hello there!', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})">Toast showLongBottom</button>
<button onclick="window.plugins.toast.show('Hello there!', 'long', 'center', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})">Toast show long center</button>
```

#### Tweaking the vertical position
Since 2.1.0 you can add pixels to move the toast up or down.
Note that `showWithOptions` can be used instead of the functions above, but it's not useful unless you want to pass `addPixelsY`.
```js
function showBottom() {
  window.plugins.toast.showWithOptions(
    {
      message: "hey there",
      duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
      position: "bottom",
      addPixelsY: -40  // added a negative value to move it up a bit (default 0)
    },
    onSuccess, // optional
    onError    // optional
  );
}
```

### Hiding a Toast
In case you want to hide a Toast manually, call this:
```js
function hide() {
  // this function takes an optional success callback, but you can do without just as well
  window.plugins.toast.hide();
}
```

### Receiving a callback when a Toast is tapped
On iOS and Android the success handler of your `show` function will be notified (again) when the toast was tapped.

So the first time the success handler fires is when the toast is shown, and in case the user taps the toast it will be
called again. You can distinguish between those events of course:

```js
  window.plugins.toast.showWithOptions(
    {
      message: "hey there",
      duration: 1500, // ms
      position: "bottom",
      addPixelsY: -40,  // (optional) added a negative value to move it up a bit (default 0)
      data: {'foo':'bar'} // (optional) pass in a JSON object here (it will be sent back in the success callback below)
    },
    // implement the success callback
    function(result) {
      if (result && result.event) {
        console.log("The toast was tapped");
        console.log("Event: " + result.event); // will be defined, with a value of "touch" when it was tapped by the user
        console.log("Message: " + result.message); // will be equal to the message you passed in
        console.log("data.foo: " + result.data.foo); // .. retrieve passed in data here
      } else {
        console.log("The toast has been shown");
      }
    }
  );
```

### Styling
Since version 2.4.0 you can pass an optional `styling` object to the plugin.
The defaults make sure the Toast looks the same as when you would not pass in the `styling` object at all.

Note that on WP this object is currently ignored.

```js
  window.plugins.toast.showWithOptions({
    message: "hey there",
    duration: "short", // 2000 ms
    position: "bottom",
    styling: {
      opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333
      textColor: '#FFFF00', // Ditto. Default #FFFFFF
      textSize: 20.5, // Default is approx. 13.
      cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
      horizontalPadding: 20, // iOS default 16, Android default 50
      verticalPadding: 16 // iOS default 12, Android default 30
    }
  });
```

Tip: if you need to pass different values for iOS and Android you can use fi. the device plugin
to determine the platform and pass `opacity: isAndroid() ? 0.7 : 0.9`.

### WP8 quirks
The WP8 implementation needs a little more work, but it's perfectly useable when you keep this in mind:
* You can't show two Toasts simultaneously.
* Wait until the first Toast is hidden before the second is shown, otherwise the second one will be hidden quickly.
* The positioning of the bottom-aligned Toast is not perfect, but keep it down to 1 or 2 lines of text and you're fine.


## 5. CREDITS

This plugin was enhanced for Plugman / PhoneGap Build by [Eddy Verbruggen](http://www.x-services.nl).
The Android code was entirely created by me.
For iOS most credits go to this excellent [Toast for iOS project by Charles Scalesse] (https://github.com/scalessec/Toast).

## 6. CHANGELOG
- 2.5.1: You can now specify the `textSize` used in the font for iOS and Android.
- 2.5.0: By popular demand: Specify the duration of the Toast on iOS and Android. Pass in `short` (2000ms), `long` (4000ms), or any nr of milliseconds: `900`.
- 2.4.2: You can now also set the Toast `opacity` for iOS.
- 2.4.1: As an addition to 2.4.0, [Sino](https://github.com/SinoBoeckmann) added the option to change the text color!
- 2.4.0: You can now style the Toast with a number of properties. See
- 2.3.2: The click event introduced with 2.3.0 did not work with Android 5+.
- 2.3.0: The plugin will now report back to JS if Toasts were tapped by the user.
- 2.0.1: iOS messages are hidden when another one is shown. [Thanks Richie Min!](https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin/pull/13)
- 2.0: WP8 support
- 1.0: initial version supporting Android and iOS
