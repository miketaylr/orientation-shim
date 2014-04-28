/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// some code inspired by Rich Tibbett's
// window.orientation shim https://gist.github.com/richtr/2966043

// Use the values of window.screen.mozOrientation
// to map to window.orientation values
let orientationMap = {
  "portrait-primary": 0,
  "portrait-secondary": 180,
  "landscape-primary": 90,
  "landscape-secondary": -90
}

// Start with a reasonable guess.
unsafeWindow.orientation = 0;

// And double-check once we're "attached"
self.port.on("attach", function() {
  unsafeWindow.orientation = orientationMap[window.screen.mozOrientation];
});

let callBodyHandler = function(body) {
  let script = unsafeWindow.document.createElement('script');
  let handler = body.getAttribute('onorientationchange');
  // In theory we could be inside an XHTML document,
  // so let's CDATA like it's 1999
  script.textContent = ["//<![CDATA[", handler, "//]]>"].join('\n');
  body.appendChild(script) && script.parentNode.removeChild(script);
}

window.screen.onmozorientationchange = function(e) {
  // Update orientation
  unsafeWindow.orientation = orientationMap[window.screen.mozOrientation];

  // Dispatch synthetic event
  let orientationEvent = unsafeWindow.document.createEvent('Event');
  orientationEvent.initEvent('orientationchange', false, false);
  unsafeWindow.dispatchEvent(orientationEvent);

  // Fire event to window.onorientationchange assigned handler (if any)
  if (typeof unsafeWindow.onorientationchange == 'function') {
    unsafeWindow.onorientationchange.call(null);
  }

  // Check for onorientationevent handler on body element and execute
  // Sadly recommended by Apple's docs [1]: <body onorientationchange="updateOrientation();">
  // And easily found all over GitHub.
  // https://developer.apple.com/library/ios/documentation/
  // AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html
  if (unsafeWindow.document.body &&
      unsafeWindow.document.body.getAttribute('onorientationchange')) {
    callBodyHandler(unsafeWindow.document.body)
  }
}