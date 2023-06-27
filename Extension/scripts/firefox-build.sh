#!/usr/bin/env zsh

npm run build:prod
rm -rf firefox-extension
mkdir firefox-extension
cp -r _locales dist images public firefox-extension/
cp manifest.json firefox-extension/
cd ./firefox-extension
zip -vr ~/Downloads/firefox-extension.zip * -x '*.DS_Store'
cd ..
rm -rf firefox-extension

zip -vr Resources * -x '*.DS_Store' -x "node_modules/*"
mv Resources.zip ~/Downloads/extension-source.zip

open ~/Downloads
echo 'Done'