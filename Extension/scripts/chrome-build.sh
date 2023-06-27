#!/usr/bin/env zsh

npm run build:prod
rm -rf chrome-extension
mkdir chrome-extension
cp -r _locales dist images public chrome-extension/
cp manifest.json chrome-extension/
zip -vr chrome-extension.zip chrome-extension/ -x '*.DS_Store'
rm -rf chrome-extension
open .
echo 'Done'
