# Keyboard Visualizer

This app is built to help you learn you're keyboard layout.

Load a custom `keymap.json` file and run the app with `pnpm tauri dev` command from your terminal.

Each time you press a key, you can visualize which key you are pressing, simple as that.
If you have multiple layers, when you activate the layer the keys changes according to your keymap.

### Requirements
See Tauri prerequisites page [https://v2.tauri.app/start/prerequisites/](https://v2.tauri.app/start/prerequisites/)

## Todo
- [ ] Handle press keys when a layout is active (except from layer 0 as is default one)
- [ ] Add transition when layer change
- [ ] Add functionality for set a layer with dedicated key;
- [ ] Add functionality to load a json file and store on user local machine;
- [ ] Load user json file if present on user local machine;
