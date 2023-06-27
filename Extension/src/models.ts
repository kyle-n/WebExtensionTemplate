export type BrowserMessageType = 'gotSettings' | 'openedBGA' | 'getColorScheme';

export type BrowserMessage = {
  type: BrowserMessageType;
  value?: any;
};

export type AppSettings = {
  muteChat: boolean;
  hideGeneralChat: boolean;
  hidePrivateChats: boolean;
  hideTableChats: boolean;
  isActive: boolean;
};

export const DEFAULT_SETTINGS: AppSettings = {
  muteChat: true,
  hideGeneralChat: true,
  hidePrivateChats: false,
  hideTableChats: true,
  isActive: true
};

export type ColorScheme = 'light' | 'dark';
