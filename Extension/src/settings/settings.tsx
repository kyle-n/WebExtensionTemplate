import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { type AppSettings } from '../models';
import settingsConnector from '../settings-connector';

type InputChangeEvent = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};

const App = () => {
  let [appSettings, setAppSettings] = useState<AppSettings | undefined>(
    undefined
  );

  useEffect(() => {
    console.log('hello from settings!');
    settingsConnector
      .getAppSettings()
      .then(settingsFromStorage => (appSettings = settingsFromStorage));
  }, []);

  useEffect(() => {
    if (appSettings?.displayHelpMessage) {
      console.log('Get help on GitHub!');
    }
  }, [appSettings?.displayHelpMessage]);

  const updateDisplayHelpMessage = (e: InputChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const displayHelpMessage = target.checked;
    settingsConnector.updateSettings({ displayHelpMessage });
  };

  if (appSettings) {
    <>
      <h1 style={{ padding: '1em 0' }}>Settings</h1>
      <section>
        <form>
          <div class="form-group">
            <input
              type="checkbox"
              id="show-help-message"
              name="show-help-message"
              checked={appSettings.displayHelpMessage}
              onChange={updateDisplayHelpMessage}
            />
            <label for="show-help-message">Show help message in console</label>
          </div>
        </form>
      </section>
    </>;
  } else {
    return null;
  }
};

const rootElem = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElem);
root.render(<App />);
