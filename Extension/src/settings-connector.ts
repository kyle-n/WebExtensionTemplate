import browser from 'webextension-polyfill';
import { type AppSettings, DEFAULT_SETTINGS } from './models';

class SettingsConnector {
  async getAppSettings() {
    const key = 'settings';
    let settings = (await browser.storage.sync.get(key))[key] as
      | Partial<AppSettings>
      | undefined;
    if (
      !settings ||
      Object.keys(settings).length !== Object.keys(DEFAULT_SETTINGS).length
    ) {
      console.log('no settings found, using default settings');
      await browser.storage.sync.set({ [key]: DEFAULT_SETTINGS });
      settings = DEFAULT_SETTINGS;
    }
    return settings as AppSettings;
  }

  async updateSettings(newSettings: Partial<AppSettings>) {
    const key = 'settings';
    const settings = await this.getAppSettings();
    const updatedSettings = { ...settings, ...newSettings };
    await browser.storage.sync.set({ [key]: updatedSettings });
    return updatedSettings;
  }
}

const singleton = new SettingsConnector();
export default singleton;
