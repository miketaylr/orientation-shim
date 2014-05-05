#!/bin/bash

# Build config for the build script, build.sh. Look there for more info.

APP_NAME=orientation-shim
CHROME_PROVIDERS=
CLEAN_UP=1
ROOT_FILES="bootstrap.js icon.png"
ROOT_DIRS=
BEFORE_BUILD=
AFTER_BUILD="mv orientation-shim.xpi bin"
PUSH_TO_DEVICE=1
ANDROID_APP_ID=org.mozilla.firefox
