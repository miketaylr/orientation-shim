# window.orientation shim add-on

This add-on adds support for the non-standard window.orientation DOM property and the "onorientationchange" event for Firefox for Android.

There's also a `sdk-version` branch with a version built with the Add-On SDK, if you're into that sort of thing. This version is a [bootstrapped](https://developer.mozilla.org/en-US/Add-ons/Bootstrapped_extensions) port of that.

*CAVEAT EMPTOR*: There are certain tablets which consider themselves landscape-primary (see http://www.matthewgifford.com/blog/2011/12/22/a-misconception-about-window-orientation/). If you're using one of these devices, please file a bug. One solution might be an options page where you can "calibrate" the add-on.

### Building & Installation

`./build`

This should open an installation prompt in Firefox for Android on your device if it's connected. You can change targets in `config_build.sh`. After installation, the `xpi` is moved to the `bin/` directory.

### Testing

After installing, navigate to [http://miketaylr.github.io/orientation-shim/](http://miketaylr.github.io/orientation-shim/) to mess with the manual tests.

### License

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.

Parts of this code inspired by https://gist.github.com/richtr/2966043, which is licensed under the Apache License, Version 2.0.
