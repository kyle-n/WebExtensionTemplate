<script lang="ts">
  import { type AppSettings } from '../models';
  import settingsConnector from '../settings-connector';

  type InputChangeEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  let appSettings: AppSettings | undefined;
  settingsConnector
    .getAppSettings()
    .then((settingsFromStorage) => (appSettings = settingsFromStorage));

  const updateDisplayHelpMessage = (e: InputChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const displayHelpMessage = target.checked;
    settingsConnector.updateSettings({ displayHelpMessage });
  };

  $: {
    if (appSettings?.displayHelpMessage) console.log('Get help on GitHub!');
  }
</script>

{#if appSettings}
  <h1>Settings</h1>
  <section>
    <form>
      <div class="form-group">
        <input
          type="checkbox"
          id="show-help-message"
          name="show-help-message"
          checked={appSettings.displayHelpMessage}
          on:change={updateDisplayHelpMessage}
        />
        <label for="show-help-message">Show help message in console</label>
      </div>
    </form>
  </section>
{/if}

<style>
  h1 {
    padding: 1em 0;
  }
</style>
