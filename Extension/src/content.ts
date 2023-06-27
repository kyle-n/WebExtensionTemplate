import browser from 'webextension-polyfill';
import {
  type AppSettings,
  type BrowserMessage,
  type BrowserMessageType,
  type ColorScheme
} from './models';

main();

async function main() {
  const message: BrowserMessage = {
    type: 'openedBGA',
    value: getColorScheme()
  };
  const response: BrowserMessage = await browser.runtime.sendMessage(message);
  updatePageWithSettings(response.value);
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('got message', message);
  switch (message.type as BrowserMessageType) {
    case 'gotSettings': {
      updatePageWithSettings(message.value as AppSettings);
    }
    case 'getColorScheme': {
      sendResponse(getColorScheme());
    }
  }
});

function updatePageWithSettings(settings: AppSettings) {
  const customCssId = 'bga-chat-filter-custom-css';
  if (settings.isActive) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styleElem = document.createElement('style');
    styleElem.setAttribute('type', 'text/css');
    styleElem.setAttribute('id', customCssId);
    styleElem.textContent = `
      #chatwindow_general {
        display: ${settings.hideGeneralChat ? 'none' : 'inline-block'};
      }
      .chatwindowtype_privatechat {
        display: ${settings.hidePrivateChats ? 'none' : 'inline-block'};
      }
      .chatwindowtype_table {
        display: ${settings.hideTableChats ? 'none' : 'inline-block'};
      }
    `;
    head.appendChild(styleElem);

    if (settings.muteChat) muteChat();
    else unmuteChat();
  } else {
    const customStyles = document.getElementById(
      customCssId
    ) as HTMLStyleElement | null;
    if (customStyles) {
      customStyles.remove();
    }
    unmuteChat();
  }
}

function muteChat() {
  console.log('muting chat');
  const audioSources = document.getElementById(
    'audiosources'
  ) as HTMLDivElement | null;
  if (audioSources) {
    Array.from(audioSources.getElementsByTagName('audio')).forEach(
      (audioElem) => {
        audioElem.muted = true;
        audioElem.pause();
      }
    );
  }
}

function unmuteChat() {
  console.log('unmuting chat');
  const audioSources = document.getElementById(
    'audiosources'
  ) as HTMLDivElement | null;
  if (audioSources) {
    Array.from(audioSources.getElementsByTagName('audio')).forEach(
      (audioElem) => {
        audioElem.muted = false;
      }
    );
  }
}

function getColorScheme() {
  let scheme: ColorScheme = 'light';
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkModeMediaQuery.matches) {
    scheme = 'dark';
  }
  return scheme;
}
