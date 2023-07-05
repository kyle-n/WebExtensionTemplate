import browser from 'webextension-polyfill';
import { detect } from 'detect-browser';
import {
  type BrowserMessage,
  type BrowserMessageType,
  type ColorScheme
} from './models';
import settingsConnector from './settings-connector';

console.log('background script running...');

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('got message', message);
  switch (message.type as BrowserMessageType) {
    case 'gotColorScheme': {
      updateIcon(message.value as ColorScheme).then(sendResponse);
      return true;
    }
  }
});

async function updateIcon(colorScheme: ColorScheme) {
  console.log('updating icon', colorScheme);
  // do work here
}
