const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");

let console = Cc["@mozilla.org/consoleservice;1"].
              getService(Ci.nsIConsoleService);

let adbLog = function(msg) {
  console.logStringMessage(msg);
}

const orientationMap = {
  "portrait-primary": 0,
  "portrait-secondary": 180,
  "landscape-primary": 90,
  "landscape-secondary": -90
}

let orientationShim = {
  init: function() {
    Services.obs.addObserver(this, "content-document-global-created", false);
  },
  observe: function(subject, topic, data) {
    //set window.orientation as soon as the global window is created,
    //before any JS in the document runs
    if (topic == "content-document-global-created") {
      let window = subject;
      this.setOrientation(window, window.screen.mozOrientation);
    }
  },
  callInlineBodyHandler: function(window) {
    // Check for inline onorientationevent handler on body element and execute
    // (in Apple's docs: <body onorientationchange="updateOrientation();">)
    let document = this.getDOMWindow(window).document;
    let script = document.createElement('script');
    let handler = document.body.getAttribute('onorientationchange');
    script.textContent = handler;
    document.body.appendChild(script);
    script.parentNode.removeChild(script);
  },
  dispatchOrientationEvent: function(window) {
    let orientationEvent = new window.CustomEvent("orientationchange", {bubbles: true,
                                                                        cancelable: true});
    // Dispatch on document, as it will bubble up to window
    window.content.document.dispatchEvent(orientationEvent);
  },
  callWindowHandler: function(window) {
    let win = this.getDOMWindow(window);
    if (typeof win.onorientationchange == "function") {
      win.onorientationchange.call(null);
    }
  },
  handleChange: function(window) {
    let win = window.content;
    this.setOrientation(win, window.screen.mozOrientation);
    this.dispatchOrientationEvent(win);
    this.callWindowHandler(win);
    if (win.document.body.getAttribute('onorientationchange')) {
      this.callInlineBodyHandler(win);
    }
  },
  getDOMWindow: function(win) {
    return win.wrappedJSObject || win;
  },
  setOrientation: function(window, orientation) {
    this.getDOMWindow(window)["orientation"] = orientationMap[orientation];
  },
  uninit: function() {
    Services.obs.removeObserver(this, "content-document-global-created");
  }
};

function loadIntoWindow(window) {
  //window here is a chrome window, not a dom window
  if (!window)
    return;

  orientationShim.init();
  window.screen.onmozorientationchange = function() {
    orientationShim.handleChange(window);
  }
}

function unloadFromWindow(window) {
  if (!window)
    return;

  // Remove Observers
  orientationShim.uninit();
}


/**
 * bootstrap.js API
 */
var windowListener = {
  onOpenWindow: function(window) {
    // Wait for the window to finish loading
    let domWindow = window.QueryInterface(Ci.nsIInterfaceRequestor)
                    .getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
    domWindow.addEventListener("load", function() {
      domWindow.removeEventListener("load", arguments.callee, false);
      loadIntoWindow(domWindow);
    }, false);
  },
  onCloseWindow: function(window) {},
  onWindowTitleChange: function(window, title) {}
};

function startup(data, reason) {
  // Load into any existing windows
  let windows = Services.wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {
    let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
    loadIntoWindow(domWindow);
  }

  // Load into any new windows
  Services.wm.addListener(windowListener);
}

function shutdown(data, reason) {
  // When the application is shutting down we normally don't have to clean
  // up any UI changes made
  if (reason == APP_SHUTDOWN)
    return;

  // Stop listening for new windows
  Services.wm.removeListener(windowListener);

  // Unload from any existing windows
  let windows = Services.wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {
    let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
    unloadFromWindow(domWindow);
  }
}

function install(data, reason) {}
function uninstall(data, reason) {}
