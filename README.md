# window.orientation shim add-on

This add-on adds support for the non-standard window.orientation DOM property and the "onorientationchange" event for Firefox for Android.

There's also a `sdk-version` branch with a version built with the Add-On SDK, if you're into that sort of thing. This version is a [bootstrapped](https://developer.mozilla.org/en-US/Add-ons/Bootstrapped_extensions) port of that.

### Building & Installation

`./build`

This should open a prompt in Nightly on your device if it's connected. You can fiddle with that in `config_build.sh`.

### Testing

After installing, navigate to [http://miketaylr.github.io/orientation-shim/](http://miketaylr.github.io/orientation-shim/) to mess with the manual tests.

### License

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
