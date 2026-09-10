const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function plugin(data) {
  class Plugin { async loadData() { return data; } }
  const ctx = { require: name => { assert.equal(name, 'obsidian'); return { Plugin, PluginSettingTab: class {}, Setting: class {} }; }, module: { exports: {} } };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../main.js'), 'utf8'), ctx);
  return new ctx.module.exports();
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
