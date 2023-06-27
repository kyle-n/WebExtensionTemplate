import browser from 'webextension-polyfill';
import { detect } from 'detect-browser';
import {
  type BrowserMessage,
  type BrowserMessageType,
  type ColorScheme
} from './models';
import settingsConnector from './settings-connector';

browser.action.onClicked.addListener(async (tab) => {
  console.log(tab);

  const settings = await settingsConnector.getAppSettings();
  const updatedSettings = await settingsConnector.updateSettings({
    isActive: !settings.isActive
  });

  const schemeMessage: BrowserMessage = {
    type: 'getColorScheme'
  };
  const colorScheme: ColorScheme = await browser.tabs.sendMessage(
    tab.id!,
    schemeMessage
  );
  updateIcon(colorScheme);

  const updateMessage: BrowserMessage = {
    type: 'gotSettings',
    value: updatedSettings
  };
  browser.tabs.sendMessage(tab.id!, updateMessage);
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('got message', message);
  switch (message.type as BrowserMessageType) {
    case 'openedBGA': {
      updateIcon(message.value as ColorScheme)
        .then(() => settingsConnector.getAppSettings())
        .then((appSettings) => {
          const response: BrowserMessage = {
            type: 'gotSettings',
            value: appSettings
          };
          sendResponse(response);
        });
      return true;
    }
  }
});

async function updateIcon(colorScheme: ColorScheme) {
  const settings = await settingsConnector.getAppSettings();
  console.log('updating icon', settings.isActive, colorScheme);
  const browserName = detect()?.name;
  const imageFilenameSuffix = colorScheme === 'light' || browserName === 'safari' ? '' : '_inverted';
  const imageFilenamePrefix = settings.isActive ? 'filled' : 'outline';
  const relativePrefix = browserName === 'chrome' ? '../' : '';
  browser.action.setIcon({
    path: {
      16: `${relativePrefix}images/${imageFilenamePrefix}_16${imageFilenameSuffix}.png`,
      19: `${relativePrefix}images/${imageFilenamePrefix}_19${imageFilenameSuffix}.png`,
      32: `${relativePrefix}images/${imageFilenamePrefix}_32${imageFilenameSuffix}.png`,
      38: `${relativePrefix}images/${imageFilenamePrefix}_38${imageFilenameSuffix}.png`,
      48: `${relativePrefix}images/${imageFilenamePrefix}_48${imageFilenameSuffix}.png`,
      72: `${relativePrefix}images/${imageFilenamePrefix}_72${imageFilenameSuffix}.png`
    }
  });
}
