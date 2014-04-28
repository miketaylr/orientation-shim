# window.orientation shim add-on

This add-on adds support for the non-standard window.orientation DOM property and the "onorientationchange" event for Firefox for Android.

### Building

With cfx in your path:

`cfx xpi --force-mobile`

### Installation

Move to your device, assuming your device is attached via USB and has debugging enabled:
`adb push window-orientation-shim.xpi /mnt/sdcard/`

Navigate to `file:///mnt/sdcard/`, and click on the xpi to install.

### Testing

After installing, navigate to [http://miketaylr.github.io/orientation-shim/](http://miketaylr.github.io/orientation-shim/) to mess with the manual tests.
