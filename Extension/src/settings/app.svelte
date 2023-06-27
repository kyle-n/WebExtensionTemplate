<script lang="ts">
  import { type AppSettings } from '../models';
  import settingsConnector from '../settings-connector';
  import HelpCredits from './help-credits.svelte';
  import Troubleshooting from './troubleshooting.svelte';

  type InputChangeEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  let appSettings: AppSettings | undefined;
  settingsConnector
    .getAppSettings()
    .then((settingsFromStorage) => (appSettings = settingsFromStorage));

  const updateMuteChat = (e: InputChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const muteChat = target.checked;
    settingsConnector.updateSettings({ muteChat });
  };

  const updateHideGeneralChat = (e: InputChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const hideGeneralChat = target.checked;
    settingsConnector.updateSettings({ hideGeneralChat });
  };

  const updateHidePrivateChats = (e: InputChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const hidePrivateChats = target.checked;
    settingsConnector.updateSettings({ hidePrivateChats });
  };

  const updateHideTableChats = (e: InputChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const hideTableChats = target.checked;
    settingsConnector.updateSettings({ hideTableChats });
  };
</script>

<h1>Settings</h1>
<p>Click Mute Chat in the browser toolbar to:</p>
{#if appSettings}
  <section>
    <form>
      <div class="form-group">
        <input
          type="checkbox"
          id="muteChat"
          name="muteChat"
          checked={appSettings.muteChat}
          on:change={updateMuteChat}
        />
        <label for="muteChat">Mute sound effects</label>
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          id="hideGeneralChat"
          name="hideGeneralChat"
          checked={appSettings.hideGeneralChat}
          on:change={updateHideGeneralChat}
        />
        <label for="hideGeneralChat">Hide general chat</label>
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          id="hidePrivateChat"
          name="hidePrivateChat"
          checked={appSettings.hidePrivateChats}
          on:change={updateHidePrivateChats}
        />
        <label for="hidePrivateChat">Hide private chats</label>
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          id="hideTableChat"
          name="hideTableChat"
          checked={appSettings.hideTableChats}
          on:change={updateHideTableChats}
        />
        <label for="hideTableChat">Hide table chats</label>
      </div>
    </form>
  </section>
{/if}
<p>Changes will appear after refresh.</p>
<section>
  <Troubleshooting />
</section>
<section>
  <HelpCredits />
</section>

<style>
  p {
    padding: 0.75em 0;
  }
  .form-group {
    margin: 0.5em 0;
  }
</style>
