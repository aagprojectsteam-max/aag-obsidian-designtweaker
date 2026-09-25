# AAG - Design Tweaker 1.1.12

This release focuses on accessibility, lifecycle safety, and Community-review compatibility while preserving the existing appearance controls.

- Adds a Command Palette action for opening Design Tweaker settings.
- Makes the custom scrollbar keyboard-accessible and improves focus visibility.
- Cleans up drag state on pointer cancel/lost capture/unload.
- Scopes explorer collapse-icon CSS and improves status-bar keyboard focus behavior.
- Uses logical RTL-friendly CSS properties where appropriate.
- Debounces high-frequency settings persistence and reduces fallback polling.
- Replaces dynamic `<style>` injection with a fixed CSS class so the plugin complies with Obsidian Community scanner policy.

Requires Obsidian 1.13.7 or newer. AAG-owned code remains MIT.

## Release asset SHA256

| Asset | SHA256 |
| --- | --- |
| main.js | `5cdd93425d5921c3d4cceea5632214089a7acbb814f06398a73e4a807ca8956d` |
| manifest.json | `58607efa11caa109acfd504d1758a96bbbe3c8e73523920a5ef61f3914488474` |
| styles.css | `8628db1cc74508b43c809a1669198758bde019276a29cf36c00c308cf10454b0` |
