const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function loadPluginModule(data) {
  class Plugin { async loadData() { return data; } }
  const ctx = { require: name => { assert.equal(name, 'obsidian'); return { Plugin, PluginSettingTab: class {}, Setting: class {} }; }, module: { exports: {} } };
  const source = fs.readFileSync(path.join(__dirname, '../main.js'), 'utf8');
  vm.runInNewContext(source + '\nmodule.exports.__test = { getScrollbarKeyTarget };', ctx);
  return ctx.module.exports;
}
function plugin(data) {
  const PluginClass = loadPluginModule(data);
  return new PluginClass();
}
test('empty installations get complete defaults without changing persisted data', async () => {
  const p = plugin(null); await p.loadSettings();
  assert.equal(typeof p.settings.masterEnabled, 'boolean');
  for (const k of ['explorerDesign','tabDesigner','dataviewTables','noteFontSize','statusBarStyle','centerScrollbar','hideSidebarIcon']) assert.equal(typeof p.settings[k], 'boolean', k);
  assert.ok(Object.keys(p.settings).length > 80);
});
test('legacy preferences migrate without overwriting newer preferences', async () => {
  const data = { statusBarAutoHide: true, dataviewRtl: true, hideBacklinksIcon: true, noteFontSizePx: 42 };
  const p = plugin(data); await p.loadSettings();
  assert.equal(p.settings.statusBarStyle, true); assert.equal(p.settings.statusBarMode, 'hover');
  assert.equal(p.settings.dataviewTables, true); assert.equal(p.settings.hideSidebarIcon, true);
  assert.equal(p.settings.hiddenSidebarIconLabel, 'backlinks'); assert.equal(p.settings.noteFontSizePx, 42);
  assert.ok(!('statusBarAutoHide' in p.settings)); assert.ok('statusBarAutoHide' in data);
  const newer = plugin({ statusBarAutoHide: true, statusBarStyle: false }); await newer.loadSettings(); assert.equal(newer.settings.statusBarStyle, false);
});
test('settings normalize invalid values and clamp numbers safely', async () => {
  const p = plugin({ noteFontSizePx: 999, explorerFontSizePx: -5, tabWidthMode: 'invalid', hiddenSidebarIconLabel: '  icon  ' });
  await p.loadSettings(); assert.equal(p.settings.noteFontSizePx, 90); assert.equal(p.settings.explorerFontSizePx, 14);
  assert.notEqual(p.settings.tabWidthMode, 'invalid'); assert.equal(p.settings.hiddenSidebarIconLabel, 'icon');
});
test('stylesheet includes gated explorer, tab and note rules', () => {
  const css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  for (const token of ['body.obsidian-redesign-explorer', '--obsidian-redesign-tab', '--obsidian-redesign-note-font-size']) assert.ok(css.includes(token));
  assert.ok(!/@import|https?:\/\//.test(css), 'No remote CSS assets');
});

test('custom scrollbar keyboard targets are clamped and predictable', () => {
  const fn = loadPluginModule(null).__test.getScrollbarKeyTarget;
  assert.equal(fn('Home', 500, 1000, 400), 0);
  assert.equal(fn('End', 100, 1000, 400), 1000);
  assert.equal(fn('ArrowUp', 20, 1000, 400), 0);
  assert.equal(fn('ArrowDown', 990, 1000, 400), 1000);
  assert.equal(fn('PageDown', 100, 1000, 400), 460);
  assert.equal(fn('Escape', 100, 1000, 400), null);
});
test('stylesheet scopes explorer collapse icons and exposes keyboard focus', () => {
  const css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  assert.match(css, /data-type="file-explorer"[\s\S]*?\.collapse-icon/);
  assert.doesNotMatch(css, /body\.obsidian-redesign-explorer-collapse-icons \.collapse-icon/);
  assert.match(css, /status-bar:focus-within/);
  assert.match(css, /custom-scrollbar:focus-visible/);
  assert.match(css, /inset-inline-end:\s*3px/);
  assert.match(css, /margin-inline-end:\s*4px/);
});
test('high-frequency controls use debounced persistence and slow fallback polling', () => {
  const source = fs.readFileSync(path.join(__dirname, '../main.js'), 'utf8');
  assert.match(source, /previewAndScheduleSettingsSave\(delayMs = 250\)/);
  assert.match(source, /setInterval\(\(\) => this\.refreshCustomScrollbars\(\), 5000\)/);
  assert.match(source, /cancelCustomScrollbarDrag\(\)/);
  assert.match(source, /pointercancel/);
  assert.match(source, /lostpointercapture/);
  assert.match(source, /role", "scrollbar"/);
});

test('sidebar icon hiding uses a fixed class instead of dynamic style elements', () => {
  const source = fs.readFileSync(path.join(__dirname, '../main.js'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');
  assert.doesNotMatch(source, /createElement\(["']style["']\)/);
  assert.match(source, /obsidian-redesign-hidden-sidebar-icon/);
  assert.match(css, /\.obsidian-redesign-hidden-sidebar-icon/);
});
