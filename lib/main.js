/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  attachTo: ["existing", "frame", "top"],
  include: "*",
  contentScriptWhen: "start",
  contentScriptFile: data.url("shim.js"),
  onAttach: function(worker) {
    worker.port.emit("attach", null);
  }
});