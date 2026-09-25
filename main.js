const { Plugin, PluginSettingTab, Setting } = require("obsidian");

const DEFAULT_SETTINGS = {
  masterEnabled: true,

  explorerDesign: true,
  explorerFontSizePx: 30,
  explorerLineHeight: 1.5,
  explorerItemSpacingPx: 4,
  explorerBorderRadiusPx: 4,
  explorerPaddingYPx: 2,
  explorerPaddingXPx: 4,
  explorerTextColorMode: "theme",
  explorerTextColor: "#000000",
  explorerFolderColors: true,
  explorerFolderBgColor: "#007bff",
  explorerFolderBgOpacity: 10,
  explorerFolderHoverOpacity: 25,
  explorerFolderActiveOpacity: 30,
  explorerFolderBold: true,
  explorerFileColors: true,
  explorerFileBgColor: "#28a745",
  explorerFileBgOpacity: 10,
  explorerFileHoverOpacity: 20,
  explorerBorders: true,
  explorerBorderColorMode: "theme",
  explorerBorderColor: "#d0d0d0",
  explorerHoverBorderColorMode: "accent",
  explorerHoverBorderColor: "#7c3aed",
  explorerCollapseIcons: true,
  explorerCollapseIconColor: "#b19cd9",
  explorerCollapseIconHoverColor: "#967bb6",
  explorerCollapseIconSizePx: 22,
  explorerCollapseIconButtonSizePx: 28,
  explorerCollapseIconStrokeWidth: 4,
  explorerBadges: true,
  explorerBadgeBgColor: "#b19cd9",
  explorerBadgeTextColor: "#ffffff",
  explorerBadgeFontSizePx: 11,
  explorerBadgeRadiusPx: 12,
  explorerIndentationGuides: true,
  explorerGuideColor: "#b19cd9",
  explorerGuideHoverColor: "#967bb6",
  explorerGuideWidthPx: 4,
  explorerGuideMarginLeftPx: 8,
  explorerGuidePaddingLeftPx: 14,
  explorerSelection: true,
  explorerSelectionBgColor: "#ffe0b2",
  explorerSelectionBorderColor: "#ffb74d",
  explorerSelectionTextColor: "#5d4037",
  explorerSelectionBold: true,

  activeFileHighlight: true,
  activeFileLightBgColor: "#fff176",
  activeFileLightBorderColor: "#fbc02d",
  activeFileLightTextColor: "#000000",
  activeFileDarkBgColor: "#f6e58d",
  activeFileDarkBorderColor: "#d8c55c",
  activeFileDarkTextColor: "#000000",
  activeFileFontWeight: "700",
  activeFileBorderWidthPx: 1,

  tabDesigner: true,
  tabTitleFontSizePx: 18,
  tabPaneTitleSize: false,
  tabPaneTitleFontSizePx: 18,
  tabPaneTitleColor: false,
  tabPaneTitleTextColor: "#ffffff",
  tabWidthMode: "theme",
  tabWidthScope: "root",
  tabMinWidthPx: 180,
  tabTitleMaxWidthPx: 240,
  tabHeightPx: 40,
  tabTitleAlign: "center",
  tabHighlightMode: "full",
  tabBorderWidthPx: 3,
  tabLightBgColor: "#fff176",
  tabLightBorderColor: "#fbc02d",
  tabLightTextColor: "#000000",
  tabLightFontWeight: "800",
  tabDarkBgColor: "#fbc02d",
  tabDarkBgOpacity: 20,
  tabDarkBorderColor: "#fbc02d",
  tabDarkTextColor: "#fff59d",
  tabDarkFontWeight: "700",
  tabCloseOpacity: 80,

  dataviewTables: true,
  dataviewDirection: "rtl",
  dataviewTextAlign: "right",
  dataviewWidth: "auto",
  dataviewTableLayout: "auto",
  dataviewWhiteSpace: "nowrap",

  noteFontSize: true,
  noteApplyEditor: true,
  noteApplyReading: true,
  noteApplyHeadings: true,
  noteApplyInlineTitle: true,
  noteScope: "root",
  noteFontSizePx: 50,
  noteHeadingScale: 3,

  statusBarStyle: true,
  statusBarMode: "hover",
  statusBarHiddenOpacity: 0,
  statusBarDimOpacity: 35,
  statusBarHoverOpacity: 100,
  statusBarTransitionMs: 250,

  centerScrollbar: true,
  centerScrollbarAlwaysVisible: true,
  centerScrollbarWidthPx: 18,
  centerScrollbarRadiusPx: 10,
  centerScrollbarThumbColor: "#b19cd9",
  centerScrollbarThumbHoverColor: "#967bb6",
  centerScrollbarTrackColor: "#000000",
  centerScrollbarTrackOpacity: 0,

  hideSidebarIcon: true,
  hiddenSidebarIconLabel: "backlinks",
  hiddenSidebarIconMatch: "contains"
};

const BOOLEAN_SETTINGS = [
  "masterEnabled",
  "explorerDesign",
  "explorerFolderColors",
  "explorerFolderBold",
  "explorerFileColors",
  "explorerBorders",
  "explorerCollapseIcons",
  "explorerBadges",
  "explorerIndentationGuides",
  "explorerSelection",
  "explorerSelectionBold",
  "activeFileHighlight",
  "tabDesigner",
  "tabPaneTitleSize",
  "tabPaneTitleColor",
  "dataviewTables",
  "noteFontSize",
  "noteApplyEditor",
  "noteApplyReading",
  "noteApplyHeadings",
  "noteApplyInlineTitle",
  "statusBarStyle",
  "centerScrollbar",
  "centerScrollbarAlwaysVisible",
  "hideSidebarIcon"
];

const NUMBER_SETTINGS = {
  explorerFontSizePx: [14, 48, 0],
  explorerLineHeight: [1, 2.4, 2],
  explorerItemSpacingPx: [0, 16, 0],
  explorerBorderRadiusPx: [0, 20, 0],
  explorerPaddingYPx: [0, 14, 0],
  explorerPaddingXPx: [0, 24, 0],
  explorerFolderBgOpacity: [0, 100, 0],
  explorerFolderHoverOpacity: [0, 100, 0],
  explorerFolderActiveOpacity: [0, 100, 0],
  explorerFileBgOpacity: [0, 100, 0],
  explorerFileHoverOpacity: [0, 100, 0],
  explorerCollapseIconSizePx: [10, 40, 0],
  explorerCollapseIconButtonSizePx: [12, 52, 0],
  explorerCollapseIconStrokeWidth: [1, 8, 1],
  explorerBadgeFontSizePx: [8, 22, 0],
  explorerBadgeRadiusPx: [0, 24, 0],
  explorerGuideWidthPx: [1, 10, 0],
  explorerGuideMarginLeftPx: [0, 28, 0],
  explorerGuidePaddingLeftPx: [0, 36, 0],
  activeFileBorderWidthPx: [0, 8, 0],
  tabTitleFontSizePx: [10, 32, 0],
  tabPaneTitleFontSizePx: [10, 44, 0],
  tabMinWidthPx: [80, 420, 0],
  tabTitleMaxWidthPx: [80, 520, 0],
  tabHeightPx: [24, 70, 0],
  tabBorderWidthPx: [0, 10, 0],
  tabDarkBgOpacity: [0, 100, 0],
  tabCloseOpacity: [0, 100, 0],
  noteFontSizePx: [14, 90, 0],
  noteHeadingScale: [1, 4, 2],
  statusBarHiddenOpacity: [0, 100, 0],
  statusBarDimOpacity: [0, 100, 0],
  statusBarHoverOpacity: [0, 100, 0],
  statusBarTransitionMs: [0, 2000, 0],
  centerScrollbarWidthPx: [4, 64, 0],
  centerScrollbarRadiusPx: [0, 24, 0],
  centerScrollbarTrackOpacity: [0, 100, 0]
};

const COLOR_SETTINGS = [
  "explorerTextColor",
  "explorerFolderBgColor",
  "explorerFileBgColor",
  "explorerBorderColor",
  "explorerHoverBorderColor",
  "explorerCollapseIconColor",
  "explorerCollapseIconHoverColor",
  "explorerBadgeBgColor",
  "explorerBadgeTextColor",
  "explorerGuideColor",
  "explorerGuideHoverColor",
  "explorerSelectionBgColor",
  "explorerSelectionBorderColor",
  "explorerSelectionTextColor",
  "activeFileLightBgColor",
  "activeFileLightBorderColor",
  "activeFileLightTextColor",
  "activeFileDarkBgColor",
  "activeFileDarkBorderColor",
  "activeFileDarkTextColor",
  "tabLightBgColor",
  "tabLightBorderColor",
  "tabLightTextColor",
  "tabDarkBgColor",
  "tabDarkBorderColor",
  "tabDarkTextColor",
  "tabPaneTitleTextColor",
  "centerScrollbarThumbColor",
  "centerScrollbarThumbHoverColor",
  "centerScrollbarTrackColor"
];

const ENUM_SETTINGS = {
  explorerTextColorMode: ["theme", "custom"],
  explorerBorderColorMode: ["theme", "accent", "custom"],
  explorerHoverBorderColorMode: ["theme", "accent", "custom"],
  activeFileFontWeight: ["400", "500", "600", "700", "800", "900"],
  tabWidthMode: ["theme", "custom"],
  tabWidthScope: ["root", "all"],
  tabTitleAlign: ["left", "center", "right"],
  tabHighlightMode: ["full", "underline", "background"],
  tabLightFontWeight: ["400", "500", "600", "700", "800", "900"],
  tabDarkFontWeight: ["400", "500", "600", "700", "800", "900"],
  dataviewDirection: ["rtl", "ltr", "inherit"],
  dataviewTextAlign: ["right", "left", "center", "start", "end"],
  dataviewWidth: ["auto", "full", "theme"],
  dataviewTableLayout: ["auto", "fixed", "theme"],
  dataviewWhiteSpace: ["nowrap", "normal", "theme"],
  noteScope: ["root", "all"],
  statusBarMode: ["hover", "dim", "hidden"],
  hiddenSidebarIconMatch: ["contains", "exact"]
};

const BODY_CLASSES = [
  "obsidian-redesign-enabled",
  "obsidian-redesign-explorer",
  "obsidian-redesign-explorer-folders",
  "obsidian-redesign-explorer-folder-bold",
  "obsidian-redesign-explorer-files",
  "obsidian-redesign-explorer-borders",
  "obsidian-redesign-explorer-collapse-icons",
  "obsidian-redesign-explorer-badges",
  "obsidian-redesign-explorer-guides",
  "obsidian-redesign-explorer-selection",
  "obsidian-redesign-explorer-selection-bold",
  "obsidian-redesign-active-file",
  "obsidian-redesign-tabs",
  "obsidian-redesign-tabs-mode-full",
  "obsidian-redesign-tabs-mode-underline",
  "obsidian-redesign-tabs-mode-background",
  "obsidian-redesign-tab-pane-title",
  "obsidian-redesign-tab-pane-title-color",
  "obsidian-redesign-tabs-width-scope-root",
  "obsidian-redesign-tabs-width-scope-all",
  "obsidian-redesign-dataview",
  "obsidian-redesign-note-editor",
  "obsidian-redesign-note-reading",
  "obsidian-redesign-note-headings",
  "obsidian-redesign-note-title",
  "obsidian-redesign-note-scope-root",
  "obsidian-redesign-note-scope-all",
  "obsidian-redesign-status-bar",
  "obsidian-redesign-status-bar-mode-hover",
  "obsidian-redesign-status-bar-mode-dim",
  "obsidian-redesign-status-bar-mode-hidden",
  "obsidian-redesign-center-scrollbar",
  "obsidian-redesign-center-scrollbar-always-visible",
  "obsidian-redesign-hide-sidebar-icon"
];

const CSS_VARIABLE_NAMES = [
  "--obsidian-redesign-explorer-font-size",
  "--obsidian-redesign-explorer-line-height",
  "--obsidian-redesign-explorer-item-spacing",
  "--obsidian-redesign-explorer-border-radius",
  "--obsidian-redesign-explorer-padding-y",
  "--obsidian-redesign-explorer-padding-x",
  "--obsidian-redesign-explorer-text-color",
  "--obsidian-redesign-explorer-folder-bg",
  "--obsidian-redesign-explorer-folder-hover-bg",
  "--obsidian-redesign-explorer-folder-active-bg",
  "--obsidian-redesign-explorer-file-bg",
  "--obsidian-redesign-explorer-file-hover-bg",
  "--obsidian-redesign-explorer-border-color",
  "--obsidian-redesign-explorer-hover-border-color",
  "--obsidian-redesign-explorer-collapse-icon-color",
  "--obsidian-redesign-explorer-collapse-icon-hover-color",
  "--obsidian-redesign-explorer-collapse-icon-size",
  "--obsidian-redesign-explorer-collapse-icon-button-size",
  "--obsidian-redesign-explorer-collapse-icon-stroke",
  "--obsidian-redesign-explorer-badge-bg",
  "--obsidian-redesign-explorer-badge-text",
  "--obsidian-redesign-explorer-badge-font-size",
  "--obsidian-redesign-explorer-badge-radius",
  "--obsidian-redesign-explorer-guide-color",
  "--obsidian-redesign-explorer-guide-hover-color",
  "--obsidian-redesign-explorer-guide-width",
  "--obsidian-redesign-explorer-guide-margin-left",
  "--obsidian-redesign-explorer-guide-padding-left",
  "--obsidian-redesign-explorer-selection-bg",
  "--obsidian-redesign-explorer-selection-border",
  "--obsidian-redesign-explorer-selection-text",
  "--obsidian-redesign-active-file-light-bg",
  "--obsidian-redesign-active-file-light-border",
  "--obsidian-redesign-active-file-light-text",
  "--obsidian-redesign-active-file-dark-bg",
  "--obsidian-redesign-active-file-dark-border",
  "--obsidian-redesign-active-file-dark-text",
  "--obsidian-redesign-active-file-font-weight",
  "--obsidian-redesign-active-file-border-width",
  "--obsidian-redesign-tab-title-font-size",
  "--obsidian-redesign-tab-pane-title-font-size",
  "--obsidian-redesign-tab-pane-title-color",
  "--obsidian-redesign-tab-min-width",
  "--obsidian-redesign-tab-title-max-width",
  "--obsidian-redesign-tab-height",
  "--obsidian-redesign-tab-title-align",
  "--obsidian-redesign-tab-border-width",
  "--obsidian-redesign-tab-light-bg",
  "--obsidian-redesign-tab-light-border",
  "--obsidian-redesign-tab-light-text",
  "--obsidian-redesign-tab-light-font-weight",
  "--obsidian-redesign-tab-dark-bg",
  "--obsidian-redesign-tab-dark-border",
  "--obsidian-redesign-tab-dark-text",
  "--obsidian-redesign-tab-dark-font-weight",
  "--obsidian-redesign-tab-close-opacity",
  "--obsidian-redesign-dataview-direction",
  "--obsidian-redesign-dataview-text-align",
  "--obsidian-redesign-dataview-width",
  "--obsidian-redesign-dataview-table-layout",
  "--obsidian-redesign-dataview-white-space",
  "--obsidian-redesign-note-font-size",
  "--obsidian-redesign-note-heading-scale",
  "--obsidian-redesign-status-bar-hidden-opacity",
  "--obsidian-redesign-status-bar-dim-opacity",
  "--obsidian-redesign-status-bar-hover-opacity",
  "--obsidian-redesign-status-bar-transition",
  "--obsidian-redesign-center-scrollbar-width",
  "--obsidian-redesign-center-scrollbar-radius",
  "--obsidian-redesign-center-scrollbar-thumb",
  "--obsidian-redesign-center-scrollbar-thumb-hover",
  "--obsidian-redesign-center-scrollbar-track"
];

module.exports = class ObsidianRedesignPlugin extends Plugin {
  async onload() {
    this.customScrollbars = new Map();
    this.activeCustomScrollbarDrag = null;
    this.settingsSaveTimer = null;
    await this.loadSettings();
    this.applySettings();
    this.addSettingTab(new RedesignSettingTab(this.app, this));
    this.addCommand({
      id: "open-design-tweaker-settings",
      name: "Open Design Tweaker settings",
      callback: () => {
        this.app.setting.open();
        this.app.setting.openTabById(this.manifest.id);
      }
    });

    this.registerEvent(this.app.workspace.on("layout-change", () => this.scheduleCustomScrollbarRefresh()));
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.scheduleCustomScrollbarRefresh()));
    this.registerEvent(this.app.workspace.on("file-open", () => this.scheduleCustomScrollbarRefresh()));
    this.registerDomEvent(window, "resize", () => this.scheduleCustomScrollbarRefresh());
    // Workspace/layout events are primary; this slow fallback catches rare content-height changes.
    this.registerInterval(window.setInterval(() => this.refreshCustomScrollbars(), 5000));
    this.scheduleCustomScrollbarRefresh();
  }

  onunload() {
    this.cancelCustomScrollbarDrag();
    if (this.settingsSaveTimer !== null) {
      window.clearTimeout(this.settingsSaveTimer);
      this.settingsSaveTimer = null;
      void this.persistSettingsOnly();
    }
    this.clearBodyState();
  }

  async loadSettings() {
    const loaded = (await this.loadData()) || {};
    const migrated = Object.assign({}, loaded);

    if ("statusBarAutoHide" in loaded && !("statusBarStyle" in loaded)) {
      migrated.statusBarStyle = loaded.statusBarAutoHide;
      migrated.statusBarMode = "hover";
    }

    if ("dataviewRtl" in loaded && !("dataviewTables" in loaded)) {
      migrated.dataviewTables = loaded.dataviewRtl;
    }

    if ("hideBacklinksIcon" in loaded && !("hideSidebarIcon" in loaded)) {
      migrated.hideSidebarIcon = loaded.hideBacklinksIcon;
      migrated.hiddenSidebarIconLabel = "backlinks";
    }

    this.settings = Object.assign({}, DEFAULT_SETTINGS, migrated);
    delete this.settings.statusBarAutoHide;
    delete this.settings.dataviewRtl;
    delete this.settings.hideBacklinksIcon;
    this.normalizeSettings();
  }

  async persistSettingsOnly() {
    this.normalizeSettings();
    await this.saveData(this.settings);
  }

  async saveSettings() {
    if (this.settingsSaveTimer !== null) {
      window.clearTimeout(this.settingsSaveTimer);
      this.settingsSaveTimer = null;
    }
    await this.persistSettingsOnly();
    this.applySettings();
  }

  previewAndScheduleSettingsSave(delayMs = 250) {
    this.normalizeSettings();
    this.applySettings();
    if (this.settingsSaveTimer !== null) {
      window.clearTimeout(this.settingsSaveTimer);
    }
    this.settingsSaveTimer = window.setTimeout(() => {
      this.settingsSaveTimer = null;
      void this.persistSettingsOnly();
    }, delayMs);
  }

  normalizeSettings() {
    for (const key of BOOLEAN_SETTINGS) {
      this.settings[key] = Boolean(this.settings[key]);
    }

    for (const [key, [min, max, precision]] of Object.entries(NUMBER_SETTINGS)) {
      this.settings[key] = clampNumber(
        this.settings[key],
        min,
        max,
        DEFAULT_SETTINGS[key],
        precision
      );
    }

    for (const key of COLOR_SETTINGS) {
      this.settings[key] = normalizeHexColor(this.settings[key], DEFAULT_SETTINGS[key]);
    }

    for (const [key, allowedValues] of Object.entries(ENUM_SETTINGS)) {
      if (!allowedValues.includes(String(this.settings[key]))) {
        this.settings[key] = DEFAULT_SETTINGS[key];
      }
    }

    this.settings.hiddenSidebarIconLabel = String(
      this.settings.hiddenSidebarIconLabel || DEFAULT_SETTINGS.hiddenSidebarIconLabel
    ).trim();
  }

  applySettings() {
    const enabled = Boolean(this.settings.masterEnabled);
    this.clearBodyClasses();

    this.toggleBodyClass("obsidian-redesign-enabled", enabled);
    this.toggleBodyClass("obsidian-redesign-explorer", enabled && this.settings.explorerDesign);
    this.toggleBodyClass(
      "obsidian-redesign-explorer-folders",
      enabled && this.settings.explorerDesign && this.settings.explorerFolderColors
    );
    this.toggleBodyClass(
      "obsidian-redesign-explorer-folder-bold",
      enabled && this.settings.explorerDesign && this.settings.explorerFolderBold
    );
    this.toggleBodyClass(
      "obsidian-redesign-explorer-files",
      enabled && this.settings.explorerDesign && this.settings.explorerFileColors
    );
    this.toggleBodyClass(
      "obsidian-redesign-explorer-borders",
      enabled && this.settings.explorerDesign && this.settings.explorerBorders
    );
    this.toggleBodyClass(
      "obsidian-redesign-explorer-collapse-icons",
      enabled && this.settings.explorerDesign && this.settings.explorerCollapseIcons
    );
    this.toggleBodyClass(
      "obsidian-redesign-explorer-badges",
      enabled && this.settings.explorerDesign && this.settings.explorerBadges
    );
    this.toggleBodyClass(
      "obsidian-redesign-explorer-guides",
      enabled && this.settings.explorerDesign && this.settings.explorerIndentationGuides
    );
    this.toggleBodyClass(
      "obsidian-redesign-explorer-selection",
      enabled && this.settings.explorerDesign && this.settings.explorerSelection
    );
    this.toggleBodyClass(
      "obsidian-redesign-explorer-selection-bold",
      enabled &&
        this.settings.explorerDesign &&
        this.settings.explorerSelection &&
        this.settings.explorerSelectionBold
    );
    this.toggleBodyClass("obsidian-redesign-active-file", enabled && this.settings.activeFileHighlight);
    this.toggleBodyClass("obsidian-redesign-tabs", enabled && this.settings.tabDesigner);
    this.toggleBodyClass(
      "obsidian-redesign-tab-pane-title",
      enabled && this.settings.tabDesigner && this.settings.tabPaneTitleSize
    );
    this.toggleBodyClass(
      "obsidian-redesign-tab-pane-title-color",
      enabled && this.settings.tabDesigner && this.settings.tabPaneTitleColor
    );
    this.toggleBodyClass(
      `obsidian-redesign-tabs-mode-${this.settings.tabHighlightMode}`,
      enabled && this.settings.tabDesigner
    );
    this.toggleBodyClass(
      `obsidian-redesign-tabs-width-scope-${this.settings.tabWidthScope}`,
      enabled && this.settings.tabDesigner
    );
    this.toggleBodyClass("obsidian-redesign-dataview", enabled && this.settings.dataviewTables);
    this.toggleBodyClass(
      "obsidian-redesign-note-editor",
      enabled && this.settings.noteFontSize && this.settings.noteApplyEditor
    );
    this.toggleBodyClass(
      "obsidian-redesign-note-reading",
      enabled && this.settings.noteFontSize && this.settings.noteApplyReading
    );
    this.toggleBodyClass(
      "obsidian-redesign-note-headings",
      enabled && this.settings.noteFontSize && this.settings.noteApplyHeadings
    );
    this.toggleBodyClass(
      "obsidian-redesign-note-title",
      enabled && this.settings.noteFontSize && this.settings.noteApplyInlineTitle
    );
    this.toggleBodyClass(
      `obsidian-redesign-note-scope-${this.settings.noteScope}`,
      enabled && this.settings.noteFontSize
    );
    this.toggleBodyClass("obsidian-redesign-status-bar", enabled && this.settings.statusBarStyle);
    this.toggleBodyClass(
      `obsidian-redesign-status-bar-mode-${this.settings.statusBarMode}`,
      enabled && this.settings.statusBarStyle
    );
    this.toggleBodyClass("obsidian-redesign-center-scrollbar", enabled && this.settings.centerScrollbar);
    this.toggleBodyClass(
      "obsidian-redesign-center-scrollbar-always-visible",
      enabled && this.settings.centerScrollbar && this.settings.centerScrollbarAlwaysVisible
    );
    this.toggleBodyClass("obsidian-redesign-hide-sidebar-icon", enabled && this.settings.hideSidebarIcon);

    this.applyCssVariables();
    this.updateDynamicStyles(enabled);
    this.scheduleCustomScrollbarRefresh();
  }

  applyCssVariables() {
    this.setCssVar("--obsidian-redesign-explorer-font-size", px(this.settings.explorerFontSizePx));
    this.setCssVar("--obsidian-redesign-explorer-line-height", this.settings.explorerLineHeight);
    this.setCssVar("--obsidian-redesign-explorer-item-spacing", px(this.settings.explorerItemSpacingPx));
    this.setCssVar("--obsidian-redesign-explorer-border-radius", px(this.settings.explorerBorderRadiusPx));
    this.setCssVar("--obsidian-redesign-explorer-padding-y", px(this.settings.explorerPaddingYPx));
    this.setCssVar("--obsidian-redesign-explorer-padding-x", px(this.settings.explorerPaddingXPx));
    this.setCssVar(
      "--obsidian-redesign-explorer-text-color",
      this.settings.explorerTextColorMode === "custom" ? this.settings.explorerTextColor : "var(--text-normal)"
    );
    this.setCssVar(
      "--obsidian-redesign-explorer-folder-bg",
      hexToRgba(this.settings.explorerFolderBgColor, this.settings.explorerFolderBgOpacity)
    );
    this.setCssVar(
      "--obsidian-redesign-explorer-folder-hover-bg",
      hexToRgba(this.settings.explorerFolderBgColor, this.settings.explorerFolderHoverOpacity)
    );
    this.setCssVar(
      "--obsidian-redesign-explorer-folder-active-bg",
      hexToRgba(this.settings.explorerFolderBgColor, this.settings.explorerFolderActiveOpacity)
    );
    this.setCssVar(
      "--obsidian-redesign-explorer-file-bg",
      hexToRgba(this.settings.explorerFileBgColor, this.settings.explorerFileBgOpacity)
    );
    this.setCssVar(
      "--obsidian-redesign-explorer-file-hover-bg",
      hexToRgba(this.settings.explorerFileBgColor, this.settings.explorerFileHoverOpacity)
    );
    this.setCssVar(
      "--obsidian-redesign-explorer-border-color",
      this.resolveThemeColor(
        this.settings.explorerBorderColorMode,
        this.settings.explorerBorderColor,
        "var(--background-modifier-border)"
      )
    );
    this.setCssVar(
      "--obsidian-redesign-explorer-hover-border-color",
      this.resolveThemeColor(
        this.settings.explorerHoverBorderColorMode,
        this.settings.explorerHoverBorderColor,
        "var(--interactive-accent)"
      )
    );
    this.setCssVar("--obsidian-redesign-explorer-collapse-icon-color", this.settings.explorerCollapseIconColor);
    this.setCssVar(
      "--obsidian-redesign-explorer-collapse-icon-hover-color",
      this.settings.explorerCollapseIconHoverColor
    );
    this.setCssVar("--obsidian-redesign-explorer-collapse-icon-size", px(this.settings.explorerCollapseIconSizePx));
    this.setCssVar(
      "--obsidian-redesign-explorer-collapse-icon-button-size",
      px(this.settings.explorerCollapseIconButtonSizePx)
    );
    this.setCssVar(
      "--obsidian-redesign-explorer-collapse-icon-stroke",
      this.settings.explorerCollapseIconStrokeWidth
    );
    this.setCssVar("--obsidian-redesign-explorer-badge-bg", this.settings.explorerBadgeBgColor);
    this.setCssVar("--obsidian-redesign-explorer-badge-text", this.settings.explorerBadgeTextColor);
    this.setCssVar("--obsidian-redesign-explorer-badge-font-size", px(this.settings.explorerBadgeFontSizePx));
    this.setCssVar("--obsidian-redesign-explorer-badge-radius", px(this.settings.explorerBadgeRadiusPx));
    this.setCssVar("--obsidian-redesign-explorer-guide-color", this.settings.explorerGuideColor);
    this.setCssVar("--obsidian-redesign-explorer-guide-hover-color", this.settings.explorerGuideHoverColor);
    this.setCssVar("--obsidian-redesign-explorer-guide-width", px(this.settings.explorerGuideWidthPx));
    this.setCssVar("--obsidian-redesign-explorer-guide-margin-left", px(this.settings.explorerGuideMarginLeftPx));
    this.setCssVar("--obsidian-redesign-explorer-guide-padding-left", px(this.settings.explorerGuidePaddingLeftPx));
    this.setCssVar("--obsidian-redesign-explorer-selection-bg", this.settings.explorerSelectionBgColor);
    this.setCssVar("--obsidian-redesign-explorer-selection-border", this.settings.explorerSelectionBorderColor);
    this.setCssVar("--obsidian-redesign-explorer-selection-text", this.settings.explorerSelectionTextColor);

    this.setCssVar("--obsidian-redesign-active-file-light-bg", this.settings.activeFileLightBgColor);
    this.setCssVar("--obsidian-redesign-active-file-light-border", this.settings.activeFileLightBorderColor);
    this.setCssVar("--obsidian-redesign-active-file-light-text", this.settings.activeFileLightTextColor);
    this.setCssVar("--obsidian-redesign-active-file-dark-bg", this.settings.activeFileDarkBgColor);
    this.setCssVar("--obsidian-redesign-active-file-dark-border", this.settings.activeFileDarkBorderColor);
    this.setCssVar("--obsidian-redesign-active-file-dark-text", this.settings.activeFileDarkTextColor);
    this.setCssVar("--obsidian-redesign-active-file-font-weight", this.settings.activeFileFontWeight);
    this.setCssVar("--obsidian-redesign-active-file-border-width", px(this.settings.activeFileBorderWidthPx));

    this.setCssVar("--obsidian-redesign-tab-title-font-size", px(this.settings.tabTitleFontSizePx));
    this.setCssVar("--obsidian-redesign-tab-pane-title-font-size", px(this.settings.tabPaneTitleFontSizePx));
    this.setCssVar("--obsidian-redesign-tab-pane-title-color", this.settings.tabPaneTitleTextColor);
    this.setCssVar(
      "--obsidian-redesign-tab-min-width",
      this.settings.tabWidthMode === "custom" ? px(this.settings.tabMinWidthPx) : "unset"
    );
    this.setCssVar(
      "--obsidian-redesign-tab-title-max-width",
      this.settings.tabWidthMode === "custom" ? px(this.settings.tabTitleMaxWidthPx) : "none"
    );
    this.setCssVar("--obsidian-redesign-tab-height", px(this.settings.tabHeightPx));
    this.setCssVar("--obsidian-redesign-tab-title-align", this.settings.tabTitleAlign);
    this.setCssVar("--obsidian-redesign-tab-border-width", px(this.settings.tabBorderWidthPx));
    this.setCssVar("--obsidian-redesign-tab-light-bg", this.settings.tabLightBgColor);
    this.setCssVar("--obsidian-redesign-tab-light-border", this.settings.tabLightBorderColor);
    this.setCssVar("--obsidian-redesign-tab-light-text", this.settings.tabLightTextColor);
    this.setCssVar("--obsidian-redesign-tab-light-font-weight", this.settings.tabLightFontWeight);
    this.setCssVar(
      "--obsidian-redesign-tab-dark-bg",
      hexToRgba(this.settings.tabDarkBgColor, this.settings.tabDarkBgOpacity)
    );
    this.setCssVar("--obsidian-redesign-tab-dark-border", this.settings.tabDarkBorderColor);
    this.setCssVar("--obsidian-redesign-tab-dark-text", this.settings.tabDarkTextColor);
    this.setCssVar("--obsidian-redesign-tab-dark-font-weight", this.settings.tabDarkFontWeight);
    this.setCssVar("--obsidian-redesign-tab-close-opacity", opacity(this.settings.tabCloseOpacity));

    this.setCssVar("--obsidian-redesign-dataview-direction", this.settings.dataviewDirection);
    this.setCssVar("--obsidian-redesign-dataview-text-align", this.settings.dataviewTextAlign);
    this.setCssVar("--obsidian-redesign-dataview-width", mapDataviewWidth(this.settings.dataviewWidth));
    this.setCssVar(
      "--obsidian-redesign-dataview-table-layout",
      this.settings.dataviewTableLayout === "theme" ? "unset" : this.settings.dataviewTableLayout
    );
    this.setCssVar(
      "--obsidian-redesign-dataview-white-space",
      this.settings.dataviewWhiteSpace === "theme" ? "normal" : this.settings.dataviewWhiteSpace
    );

    this.setCssVar("--obsidian-redesign-note-font-size", px(this.settings.noteFontSizePx));
    this.setCssVar("--obsidian-redesign-note-heading-scale", this.settings.noteHeadingScale);

    this.setCssVar("--obsidian-redesign-status-bar-hidden-opacity", opacity(this.settings.statusBarHiddenOpacity));
    this.setCssVar("--obsidian-redesign-status-bar-dim-opacity", opacity(this.settings.statusBarDimOpacity));
    this.setCssVar("--obsidian-redesign-status-bar-hover-opacity", opacity(this.settings.statusBarHoverOpacity));
    this.setCssVar("--obsidian-redesign-status-bar-transition", `${this.settings.statusBarTransitionMs}ms`);
    this.setCssVar("--obsidian-redesign-center-scrollbar-width", px(this.settings.centerScrollbarWidthPx));
    this.setCssVar("--obsidian-redesign-center-scrollbar-radius", px(this.settings.centerScrollbarRadiusPx));
    this.setCssVar("--obsidian-redesign-center-scrollbar-thumb", this.settings.centerScrollbarThumbColor);
    this.setCssVar(
      "--obsidian-redesign-center-scrollbar-thumb-hover",
      this.settings.centerScrollbarThumbHoverColor
    );
    this.setCssVar(
      "--obsidian-redesign-center-scrollbar-track",
      hexToRgba(this.settings.centerScrollbarTrackColor, this.settings.centerScrollbarTrackOpacity)
    );
  }

  updateDynamicStyles(enabled) {
    if (!enabled || !this.settings.hideSidebarIcon || !this.settings.hiddenSidebarIconLabel) {
      this.removeDynamicStyle();
      return;
    }

    if (!this.dynamicStyleEl) {
      this.dynamicStyleEl = document.createElement("style");
      this.dynamicStyleEl.setAttribute("data-obsidian-redesign", "dynamic");
      document.head.appendChild(this.dynamicStyleEl);
    }

    const operator = this.settings.hiddenSidebarIconMatch === "exact" ? "=" : "*=";
    const label = escapeCssAttributeValue(this.settings.hiddenSidebarIconLabel);
    this.dynamicStyleEl.textContent = `
body.obsidian-redesign-hide-sidebar-icon .sidebar-tabs [aria-label${operator}"${label}" i] {
  display: none !important;
}
`;
  }

  scheduleCustomScrollbarRefresh() {
    if (this.customScrollbarFrame) {
      window.cancelAnimationFrame(this.customScrollbarFrame);
    }

    this.customScrollbarFrame = window.requestAnimationFrame(() => {
      this.customScrollbarFrame = null;
      this.refreshCustomScrollbars();
    });
  }

  refreshCustomScrollbars() {
    if (!this.settings || !this.settings.masterEnabled || !this.settings.centerScrollbar) {
      this.removeCustomScrollbars();
      return;
    }

    const scrollElements = new Set(
      Array.from(
        document.querySelectorAll(
          [
            '.workspace-split.mod-root .workspace-leaf-content[data-type="markdown"] .markdown-source-view.mod-cm6 .cm-scroller',
            '.workspace-split.mod-root .workspace-leaf-content[data-type="markdown"] .markdown-reading-view .markdown-preview-view'
          ].join(", ")
        )
      ).filter((element) => element instanceof HTMLElement)
    );

    for (const scrollElement of Array.from(this.customScrollbars.keys())) {
      if (!scrollElements.has(scrollElement) || !document.body.contains(scrollElement)) {
        this.removeCustomScrollbar(scrollElement);
      }
    }

    for (const scrollElement of scrollElements) {
      this.ensureCustomScrollbar(scrollElement);
      this.updateCustomScrollbar(scrollElement);
    }
  }

  ensureCustomScrollbar(scrollElement) {
    const host = scrollElement.closest('.workspace-leaf-content[data-type="markdown"] > .view-content');

    if (!host) {
      return;
    }

    const existing = this.customScrollbars.get(scrollElement);
    if (existing && existing.host === host) {
      return;
    }

    if (existing) {
      this.removeCustomScrollbar(scrollElement);
    }

    host.addClass("obsidian-redesign-scrollbar-host");

    const bar = document.createElement("div");
    bar.className = "obsidian-redesign-custom-scrollbar";
    bar.setAttribute("role", "scrollbar");
    bar.setAttribute("aria-label", "Markdown content scrollbar");
    bar.setAttribute("aria-orientation", "vertical");
    bar.setAttribute("aria-valuemin", "0");
    bar.tabIndex = 0;
    const thumb = document.createElement("div");
    thumb.className = "obsidian-redesign-custom-scrollbar-thumb";
    bar.appendChild(thumb);
    host.appendChild(bar);

    const data = {
      bar,
      host,
      onKeyDown: null,
      onPointerDown: null,
      onScroll: null,
      thumb
    };

    data.onScroll = () => this.updateCustomScrollbar(scrollElement);
    data.onPointerDown = (event) => this.startCustomScrollbarDrag(event, scrollElement);
    data.onKeyDown = (event) => {
      const maxScrollTop = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);
      const target = getScrollbarKeyTarget(
        event.key,
        scrollElement.scrollTop,
        maxScrollTop,
        scrollElement.clientHeight
      );
      if (target === null) return;
      event.preventDefault();
      scrollElement.scrollTop = target;
      this.updateCustomScrollbar(scrollElement);
    };

    scrollElement.addEventListener("scroll", data.onScroll, { passive: true });
    bar.addEventListener("pointerdown", data.onPointerDown);
    bar.addEventListener("keydown", data.onKeyDown);

    this.customScrollbars.set(scrollElement, data);
  }

  updateCustomScrollbar(scrollElement) {
    const data = this.customScrollbars.get(scrollElement);

    if (!data || !document.body.contains(scrollElement)) {
      return;
    }

    const { bar, host, thumb } = data;
    const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;

    if (maxScrollTop <= 1) {
      bar.style.display = "none";
      bar.setAttribute("aria-hidden", "true");
      bar.tabIndex = -1;
      return;
    }

    const hostRect = host.getBoundingClientRect();
    const scrollRect = scrollElement.getBoundingClientRect();
    const top = Math.max(0, scrollRect.top - hostRect.top);
    const height = Math.max(0, Math.min(scrollRect.height, hostRect.bottom - scrollRect.top));

    if (height <= 0) {
      bar.style.display = "none";
      bar.setAttribute("aria-hidden", "true");
      bar.tabIndex = -1;
      return;
    }

    const width = this.settings.centerScrollbarWidthPx;
    const thumbHeight = Math.max(width * 2, Math.round((scrollElement.clientHeight / scrollElement.scrollHeight) * height));
    const maxThumbTop = Math.max(0, height - thumbHeight);
    const thumbTop = Math.round((scrollElement.scrollTop / maxScrollTop) * maxThumbTop);

    bar.style.display = "";
    bar.removeAttribute("aria-hidden");
    bar.tabIndex = 0;
    bar.setAttribute("aria-valuemax", String(Math.max(0, Math.round(maxScrollTop))));
    bar.setAttribute("aria-valuenow", String(Math.max(0, Math.round(scrollElement.scrollTop))));
    bar.style.top = `${top}px`;
    bar.style.height = `${height}px`;
    bar.style.width = `${width}px`;
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${thumbTop}px)`;
  }

  cancelCustomScrollbarDrag() {
    const drag = this.activeCustomScrollbarDrag;
    if (!drag) return;
    this.activeCustomScrollbarDrag = null;
    drag.finish();
  }

  startCustomScrollbarDrag(event, scrollElement) {
    const data = this.customScrollbars.get(scrollElement);
    if (!data || event.isPrimary === false) return;

    event.preventDefault();
    this.cancelCustomScrollbarDrag();

    const { bar, thumb } = data;
    const pointerId = event.pointerId;
    const barRect = bar.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;
    const maxThumbTop = Math.max(1, barRect.height - thumbRect.height);
    if (maxScrollTop <= 1) return;

    const pointerOffset = event.target === thumb ? event.clientY - thumbRect.top : thumbRect.height / 2;
    const moveTo = (clientY) => {
      const thumbTop = Math.min(maxThumbTop, Math.max(0, clientY - barRect.top - pointerOffset));
      scrollElement.scrollTop = (thumbTop / maxThumbTop) * maxScrollTop;
      this.updateCustomScrollbar(scrollElement);
    };
    const onPointerMove = (moveEvent) => {
      if (moveEvent.pointerId !== pointerId) return;
      moveEvent.preventDefault();
      moveTo(moveEvent.clientY);
    };

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerEnd);
      document.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("blur", finish);
      bar.removeEventListener("lostpointercapture", finish);
      try {
        if (bar.hasPointerCapture?.(pointerId)) bar.releasePointerCapture(pointerId);
      } catch {}
      document.body.classList.remove("obsidian-redesign-scrollbar-dragging");
      if (this.activeCustomScrollbarDrag?.finish === finish) this.activeCustomScrollbarDrag = null;
    };
    const onPointerEnd = (endEvent) => {
      if (endEvent.pointerId === pointerId) finish();
    };

    this.activeCustomScrollbarDrag = { finish, pointerId, scrollElement };
    document.body.classList.add("obsidian-redesign-scrollbar-dragging");
    try { bar.setPointerCapture?.(pointerId); } catch {}
    moveTo(event.clientY);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerEnd);
    document.addEventListener("pointercancel", onPointerEnd);
    window.addEventListener("blur", finish, { once: true });
    bar.addEventListener("lostpointercapture", finish, { once: true });
  }

  removeCustomScrollbars() {
    if (this.customScrollbarFrame) {
      window.cancelAnimationFrame(this.customScrollbarFrame);
      this.customScrollbarFrame = null;
    }

    if (!this.customScrollbars) {
      return;
    }

    for (const scrollElement of Array.from(this.customScrollbars.keys())) {
      this.removeCustomScrollbar(scrollElement);
    }
  }

  removeCustomScrollbar(scrollElement) {
    const data = this.customScrollbars && this.customScrollbars.get(scrollElement);

    if (!data) {
      return;
    }

    if (this.activeCustomScrollbarDrag?.scrollElement === scrollElement) {
      this.cancelCustomScrollbarDrag();
    }
    scrollElement.removeEventListener("scroll", data.onScroll);
    data.bar.removeEventListener("pointerdown", data.onPointerDown);
    data.bar.removeEventListener("keydown", data.onKeyDown);
    data.bar.remove();

    if (!data.host.querySelector(".obsidian-redesign-custom-scrollbar")) {
      data.host.removeClass("obsidian-redesign-scrollbar-host");
    }

    this.customScrollbars.delete(scrollElement);
  }

  resolveThemeColor(mode, customColor, themeFallback) {
    if (mode === "custom") {
      return customColor;
    }

    if (mode === "accent") {
      return "var(--interactive-accent)";
    }

    return themeFallback;
  }

  setCssVar(name, value) {
    document.body.style.setProperty(name, String(value));
  }

  toggleBodyClass(className, enabled) {
    document.body.classList.toggle(className, Boolean(enabled));
  }

  clearBodyClasses() {
    for (const className of BODY_CLASSES) {
      document.body.classList.remove(className);
    }
  }

  clearBodyState() {
    this.clearBodyClasses();

    for (const name of CSS_VARIABLE_NAMES) {
      document.body.style.removeProperty(name);
    }

    this.removeCustomScrollbars();
    this.removeDynamicStyle();
  }

  removeDynamicStyle() {
    if (this.dynamicStyleEl) {
      this.dynamicStyleEl.remove();
      this.dynamicStyleEl = null;
    }
  }
};

class RedesignSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("obsidian-redesign-settings");

    containerEl.createEl("h2", { text: "AAG - Obsidian Design Tweaker" });
    containerEl.createEl("p", {
      text: "A control panel for tweaking the Obsidian design, split into focused sections."
    });

    this.addGeneralSection();
    this.addExplorerSection();
    this.addActiveFileSection();
    this.addTabsSection();
    this.addDataviewSection();
    this.addNotesSection();
    this.addScrollbarsSection();
    this.addStatusBarSection();
    this.addSidebarIconSection();
  }

  addGeneralSection() {
    const section = this.createSection("General", "Turn the entire redesign on or off.", true);

    this.addToggle(section, "Enable redesign", "Applies or removes every style controlled by this plugin.", "masterEnabled");

    new Setting(section)
      .setName("Reset everything")
      .setDesc("Restore all toggles, colors, sizes, and modes to the defaults.")
      .addButton((button) =>
        button
          .setButtonText("Reset")
          .setWarning()
          .onClick(async () => {
            this.plugin.settings = Object.assign({}, DEFAULT_SETTINGS);
            await this.plugin.saveSettings();
            this.display();
          })
      );
  }

  addExplorerSection() {
    const section = this.createSection(
      "File explorer",
      "Controls the file and folder list, including spacing, colors, badges, arrows, and selected items."
    );

    this.addToggle(section, "Enable file explorer design", "Turns this whole explorer section on or off.", "explorerDesign");
    this.addSlider(section, "Font size", "Text size for files and folders.", "explorerFontSizePx", 14, 48, 1);
    this.addSlider(section, "Line height", "Vertical rhythm inside each explorer row.", "explorerLineHeight", 1, 2.4, 0.05);
    this.addSlider(section, "Item spacing", "Gap between rows.", "explorerItemSpacingPx", 0, 16, 1);
    this.addSlider(section, "Corner radius", "Roundness of file and folder rows.", "explorerBorderRadiusPx", 0, 20, 1);
    this.addSlider(section, "Vertical padding", "Top and bottom padding inside rows.", "explorerPaddingYPx", 0, 14, 1);
    this.addSlider(section, "Horizontal padding", "Left and right padding inside rows.", "explorerPaddingXPx", 0, 24, 1);
    this.addDropdown(section, "Text color", "Use the theme text color or choose a custom one.", "explorerTextColorMode", {
      theme: "Theme",
      custom: "Custom"
    });
    this.addColor(section, "Custom text color", "Used when text color is set to custom.", "explorerTextColor");

    this.addSubheading(section, "Folders");
    this.addToggle(section, "Folder colors", "Adds colored backgrounds to folder rows.", "explorerFolderColors");
    this.addColor(section, "Folder color", "Base color used for folder backgrounds.", "explorerFolderBgColor");
    this.addSlider(section, "Folder opacity", "Folder background strength.", "explorerFolderBgOpacity", 0, 100, 1);
    this.addSlider(section, "Folder hover opacity", "Folder background strength on hover.", "explorerFolderHoverOpacity", 0, 100, 1);
    this.addSlider(section, "Folder active opacity", "Folder background strength while clicked or dragged.", "explorerFolderActiveOpacity", 0, 100, 1);
    this.addToggle(section, "Bold folder names", "Makes folder names heavier.", "explorerFolderBold");

    this.addSubheading(section, "Files");
    this.addToggle(section, "File colors", "Adds colored backgrounds to file rows.", "explorerFileColors");
    this.addColor(section, "File color", "Base color used for file backgrounds.", "explorerFileBgColor");
    this.addSlider(section, "File opacity", "File background strength.", "explorerFileBgOpacity", 0, 100, 1);
    this.addSlider(section, "File hover opacity", "File background strength on hover.", "explorerFileHoverOpacity", 0, 100, 1);

    this.addSubheading(section, "Borders");
    this.addToggle(section, "Borders", "Adds borders to file and folder rows.", "explorerBorders");
    this.addDropdown(section, "Border color", "Choose where the normal border color comes from.", "explorerBorderColorMode", {
      theme: "Theme border",
      accent: "Theme accent",
      custom: "Custom"
    });
    this.addColor(section, "Custom border color", "Used when border color is set to custom.", "explorerBorderColor");
    this.addDropdown(
      section,
      "Hover border color",
      "Choose where the hover border color comes from.",
      "explorerHoverBorderColorMode",
      {
        theme: "Theme border",
        accent: "Theme accent",
        custom: "Custom"
      }
    );
    this.addColor(section, "Custom hover border", "Used when hover border color is set to custom.", "explorerHoverBorderColor");

    this.addSubheading(section, "Collapse arrows");
    this.addToggle(section, "Collapse arrows", "Styles and enlarges collapse arrows.", "explorerCollapseIcons");
    this.addColor(section, "Arrow color", "Normal collapse arrow color.", "explorerCollapseIconColor");
    this.addColor(section, "Arrow hover color", "Collapse arrow color on hover.", "explorerCollapseIconHoverColor");
    this.addSlider(section, "Arrow size", "Size of the SVG arrow itself.", "explorerCollapseIconSizePx", 10, 40, 1);
    this.addSlider(section, "Arrow hit area", "Clickable area around the arrow.", "explorerCollapseIconButtonSizePx", 12, 52, 1);
    this.addSlider(section, "Arrow stroke", "Line thickness of the arrow.", "explorerCollapseIconStrokeWidth", 1, 8, 0.5);

    this.addSubheading(section, "Folder badges");
    this.addToggle(section, "Folder badges", "Styles the small folder count badge.", "explorerBadges");
    this.addColor(section, "Badge background", "Background color for count badges.", "explorerBadgeBgColor");
    this.addColor(section, "Badge text", "Text color for count badges.", "explorerBadgeTextColor");
    this.addSlider(section, "Badge text size", "Font size inside count badges.", "explorerBadgeFontSizePx", 8, 22, 1);
    this.addSlider(section, "Badge radius", "Roundness of count badges.", "explorerBadgeRadiusPx", 0, 24, 1);

    this.addSubheading(section, "Indentation guides");
    this.addToggle(section, "Indentation guides", "Adds stronger indentation guide lines.", "explorerIndentationGuides");
    this.addColor(section, "Guide color", "Normal indentation guide color.", "explorerGuideColor");
    this.addColor(section, "Guide hover color", "Guide color on hover.", "explorerGuideHoverColor");
    this.addSlider(section, "Guide width", "Thickness of guide lines.", "explorerGuideWidthPx", 1, 10, 1);
    this.addSlider(section, "Guide margin", "Horizontal position of the guide line.", "explorerGuideMarginLeftPx", 0, 28, 1);
    this.addSlider(section, "Guide padding", "Space between guide line and nested items.", "explorerGuidePaddingLeftPx", 0, 36, 1);

    this.addSubheading(section, "Selection");
    this.addToggle(section, "Selected item highlight", "Styles selected files and folders.", "explorerSelection");
    this.addColor(section, "Selection background", "Background color for selected rows.", "explorerSelectionBgColor");
    this.addColor(section, "Selection border", "Border color for selected rows.", "explorerSelectionBorderColor");
    this.addColor(section, "Selection text", "Text color for selected rows.", "explorerSelectionTextColor");
    this.addToggle(section, "Bold selected text", "Makes selected row text bold.", "explorerSelectionBold");
  }

  addActiveFileSection() {
    const section = this.createSection("Active file", "Controls the highlighted currently-open file in the explorer.");

    this.addToggle(section, "Enable active file highlight", "Highlights the currently open file.", "activeFileHighlight");
    this.addDropdown(section, "Text weight", "Font weight for the active file.", "activeFileFontWeight", fontWeightOptions());
    this.addSlider(section, "Border width", "Border thickness for the active file.", "activeFileBorderWidthPx", 0, 8, 1);
    this.addSubheading(section, "Light theme");
    this.addColor(section, "Background", "Active file background in light theme.", "activeFileLightBgColor");
    this.addColor(section, "Border", "Active file border in light theme.", "activeFileLightBorderColor");
    this.addColor(section, "Text", "Active file text in light theme.", "activeFileLightTextColor");
    this.addSubheading(section, "Dark theme");
    this.addColor(section, "Background", "Active file background in dark theme.", "activeFileDarkBgColor");
    this.addColor(section, "Border", "Active file border in dark theme.", "activeFileDarkBorderColor");
    this.addColor(section, "Text", "Active file text in dark theme.", "activeFileDarkTextColor");
  }

  addTabsSection() {
    const section = this.createSection("Tabs", "Controls tab title size and active-tab styling.");

    this.addToggle(section, "Enable tab design", "Turns active tab styling on or off.", "tabDesigner");
    this.addSlider(section, "Tab bar title size", "Font size for titles in the top tab bar.", "tabTitleFontSizePx", 10, 32, 1);
    this.addSubheading(section, "Title inside tab");
    this.addToggle(section, "Enable title inside tab size", "Changes only the title text inside the Markdown tab, not the top tab label.", "tabPaneTitleSize");
    this.addSlider(section, "Title inside tab size", "Font size for the file title shown inside the tab content area.", "tabPaneTitleFontSizePx", 10, 44, 1);
    this.addToggle(section, "Enable title inside tab color", "Changes only the title color inside the Markdown tab.", "tabPaneTitleColor");
    this.addColor(section, "Title inside tab color", "Color for the file title shown inside the tab content area.", "tabPaneTitleTextColor");
    this.addSubheading(section, "Tab bar layout");
    this.addDropdown(section, "Tab width", "Use Obsidian's default tab width or set wider custom tabs.", "tabWidthMode", {
      theme: "Theme default",
      custom: "Custom width"
    });
    this.addDropdown(section, "Width applies to", "Choose whether custom tab width affects only editor tabs or every tab.", "tabWidthScope", {
      root: "Editor/file area only",
      all: "All tabs"
    });
    this.addSlider(section, "Minimum tab width", "Expands the whole tab so longer names have more room.", "tabMinWidthPx", 80, 420, 5);
    this.addSlider(section, "Title name width", "Controls how much space the tab name can use before it is shortened.", "tabTitleMaxWidthPx", 80, 520, 5);
    this.addSlider(section, "Tab height", "Height of tab headers.", "tabHeightPx", 24, 70, 1);
    this.addDropdown(section, "Title alignment", "Horizontal alignment of tab titles.", "tabTitleAlign", {
      left: "Left",
      center: "Center",
      right: "Right"
    });
    this.addDropdown(section, "Highlight style", "How the active tab should be marked.", "tabHighlightMode", {
      full: "Background + underline",
      underline: "Underline only",
      background: "Background only"
    });
    this.addSlider(section, "Underline width", "Thickness of the active tab underline.", "tabBorderWidthPx", 0, 10, 1);
    this.addSlider(section, "Close button opacity", "Opacity for the active tab close button.", "tabCloseOpacity", 0, 100, 1);

    this.addSubheading(section, "Light theme");
    this.addColor(section, "Background", "Active tab background in light theme.", "tabLightBgColor");
    this.addColor(section, "Underline", "Active tab underline in light theme.", "tabLightBorderColor");
    this.addColor(section, "Text", "Active tab text in light theme.", "tabLightTextColor");
    this.addDropdown(section, "Text weight", "Active tab text weight in light theme.", "tabLightFontWeight", fontWeightOptions());

    this.addSubheading(section, "Dark theme");
    this.addColor(section, "Background color", "Base active tab color in dark theme.", "tabDarkBgColor");
    this.addSlider(section, "Background opacity", "Dark theme active tab background strength.", "tabDarkBgOpacity", 0, 100, 1);
    this.addColor(section, "Underline", "Active tab underline in dark theme.", "tabDarkBorderColor");
    this.addColor(section, "Text", "Active tab text in dark theme.", "tabDarkTextColor");
    this.addDropdown(section, "Text weight", "Active tab text weight in dark theme.", "tabDarkFontWeight", fontWeightOptions());
  }

  addDataviewSection() {
    const section = this.createSection("Dataview tables", "Controls direction, alignment, width, layout, and wrapping.");

    this.addToggle(section, "Enable Dataview table design", "Applies table layout styles to Dataview tables.", "dataviewTables");
    this.addDropdown(section, "Direction", "Text direction for Dataview tables.", "dataviewDirection", {
      rtl: "RTL",
      ltr: "LTR",
      inherit: "Theme default"
    });
    this.addDropdown(section, "Text alignment", "Cell and header alignment.", "dataviewTextAlign", {
      right: "Right",
      left: "Left",
      center: "Center",
      start: "Start",
      end: "End"
    });
    this.addDropdown(section, "Width", "Table width behavior.", "dataviewWidth", {
      auto: "Auto",
      full: "Full width",
      theme: "Theme default"
    });
    this.addDropdown(section, "Table layout", "Browser table-layout behavior.", "dataviewTableLayout", {
      auto: "Auto",
      fixed: "Fixed",
      theme: "Theme default"
    });
    this.addDropdown(section, "Cell wrapping", "Whether table cell text can wrap.", "dataviewWhiteSpace", {
      nowrap: "No wrap",
      normal: "Wrap normally",
      theme: "Theme default"
    });
  }

  addNotesSection() {
    const section = this.createSection("Notes", "Controls note text size in editor, reading view, headings, and inline titles.");

    this.addToggle(section, "Enable note font size", "Applies the note font controls below.", "noteFontSize");
    this.addDropdown(section, "Note size applies to", "Choose whether note text sizing affects only the main file area or every Markdown view.", "noteScope", {
      root: "Editor/file area only",
      all: "All Markdown views"
    });
    this.addSlider(section, "Note text size", "Base text size for notes.", "noteFontSizePx", 14, 90, 1);
    this.addSlider(section, "Heading scale", "Multiplies note text size for headings and inline titles.", "noteHeadingScale", 1, 4, 0.05);
    this.addToggle(section, "Apply to editor", "Changes text size in editing view.", "noteApplyEditor");
    this.addToggle(section, "Apply to reading view", "Changes text size in reading view.", "noteApplyReading");
    this.addToggle(section, "Apply to rendered headings", "Changes heading size in reading view.", "noteApplyHeadings");
    this.addToggle(section, "Apply to inline title", "Changes the note title shown above the note.", "noteApplyInlineTitle");
  }

  addStatusBarSection() {
    const section = this.createSection("Status bar", "Controls whether the status bar is hidden, dimmed, or shown on hover.");

    this.addToggle(section, "Enable status bar styling", "Turns status bar controls on or off.", "statusBarStyle");
    this.addDropdown(section, "Mode", "How the status bar behaves.", "statusBarMode", {
      hover: "Hidden until hover",
      dim: "Dim until hover",
      hidden: "Always hidden"
    });
    this.addSlider(section, "Hidden opacity", "Opacity when using hidden-until-hover mode.", "statusBarHiddenOpacity", 0, 100, 1);
    this.addSlider(section, "Dim opacity", "Opacity when using dim-until-hover mode.", "statusBarDimOpacity", 0, 100, 1);
    this.addSlider(section, "Hover opacity", "Opacity while hovering over the status bar.", "statusBarHoverOpacity", 0, 100, 1);
    this.addSlider(section, "Transition speed", "Fade speed in milliseconds.", "statusBarTransitionMs", 0, 2000, 25);
  }

  addScrollbarsSection() {
    const section = this.createSection("Scrollbars", "Controls only the Markdown file content scrollbar.");

    this.addToggle(section, "Enable file scrollbar", "Styles only the Markdown file content scrollbar, not tabs or menus.", "centerScrollbar");
    this.addToggle(section, "Always show vertical scrollbar", "Keeps vertical scrollbar space visible in the Markdown file content area.", "centerScrollbarAlwaysVisible");
    this.addSlider(section, "Scrollbar thickness", "Width of the vertical scrollbar in the Markdown file content area.", "centerScrollbarWidthPx", 4, 64, 1);
    this.addSlider(section, "Scrollbar radius", "Roundness of the scrollbar thumb.", "centerScrollbarRadiusPx", 0, 24, 1);
    this.addColor(section, "Thumb color", "Main color of the scrollbar handle.", "centerScrollbarThumbColor");
    this.addColor(section, "Thumb hover color", "Scrollbar handle color while hovering.", "centerScrollbarThumbHoverColor");
    this.addColor(section, "Track color", "Background track behind the scrollbar handle.", "centerScrollbarTrackColor");
    this.addSlider(section, "Track opacity", "How visible the scrollbar track should be.", "centerScrollbarTrackOpacity", 0, 100, 1);
  }

  addSidebarIconSection() {
    const section = this.createSection("Sidebar icon", "Hides a sidebar tab by its aria label.");

    this.addToggle(section, "Hide sidebar icon", "Turns sidebar icon hiding on or off.", "hideSidebarIcon");
    this.addText(section, "Icon label", "Default is backlinks. You can use another label if needed.", "hiddenSidebarIconLabel");
    this.addDropdown(section, "Match mode", "Exact label match or partial label match.", "hiddenSidebarIconMatch", {
      contains: "Contains",
      exact: "Exact"
    });
  }

  createSection(title, description, open = false) {
    const details = this.containerEl.createEl("details", {
      cls: "obsidian-redesign-settings-section"
    });
    details.open = open;
    details.createEl("summary", { text: title });
    details.createEl("p", {
      cls: "obsidian-redesign-settings-section-description",
      text: description
    });
    return details.createDiv({ cls: "obsidian-redesign-settings-section-content" });
  }

  addSubheading(container, title) {
    container.createEl("h3", {
      cls: "obsidian-redesign-settings-subheading",
      text: title
    });
  }

  addToggle(container, name, desc, settingKey) {
    new Setting(container)
      .setName(name)
      .setDesc(desc)
      .addToggle((toggle) =>
        toggle.setValue(Boolean(this.plugin.settings[settingKey])).onChange(async (value) => {
          this.plugin.settings[settingKey] = value;
          await this.plugin.saveSettings();
        })
      );
  }

  addSlider(container, name, desc, settingKey, min, max, step) {
    new Setting(container)
      .setName(name)
      .setDesc(desc)
      .addSlider((slider) =>
        slider
          .setLimits(min, max, step)
          .setValue(this.plugin.settings[settingKey])
          .setDynamicTooltip()
          .onChange((value) => {
            this.plugin.settings[settingKey] = value;
            this.plugin.previewAndScheduleSettingsSave();
          })
      );
  }

  addDropdown(container, name, desc, settingKey, options) {
    new Setting(container)
      .setName(name)
      .setDesc(desc)
      .addDropdown((dropdown) => {
        for (const [value, label] of Object.entries(options)) {
          dropdown.addOption(value, label);
        }

        dropdown.setValue(String(this.plugin.settings[settingKey]));
        dropdown.onChange(async (value) => {
          this.plugin.settings[settingKey] = value;
          await this.plugin.saveSettings();
        });
      });
  }

  addColor(container, name, desc, settingKey) {
    new Setting(container)
      .setName(name)
      .setDesc(desc)
      .addColorPicker((color) =>
        color.setValue(this.plugin.settings[settingKey]).onChange((value) => {
          this.plugin.settings[settingKey] = value;
          this.plugin.previewAndScheduleSettingsSave();
        })
      );
  }

  addText(container, name, desc, settingKey) {
    new Setting(container)
      .setName(name)
      .setDesc(desc)
      .addText((text) =>
        text.setValue(this.plugin.settings[settingKey]).onChange((value) => {
          this.plugin.settings[settingKey] = value;
          this.plugin.previewAndScheduleSettingsSave();
        })
      );
  }
}

function getScrollbarKeyTarget(key, current, max, pageSize) {
  const safeMax = Math.max(0, Number(max) || 0);
  const safeCurrent = Math.max(0, Math.min(safeMax, Number(current) || 0));
  const page = Math.max(40, (Number(pageSize) || 0) * 0.9);
  let next;
  switch (key) {
    case "ArrowUp": next = safeCurrent - 40; break;
    case "ArrowDown": next = safeCurrent + 40; break;
    case "PageUp": next = safeCurrent - page; break;
    case "PageDown": next = safeCurrent + page; break;
    case "Home": next = 0; break;
    case "End": next = safeMax; break;
    default: return null;
  }
  return Math.max(0, Math.min(safeMax, next));
}

function fontWeightOptions() {
  return {
    400: "400 Regular",
    500: "500 Medium",
    600: "600 Semibold",
    700: "700 Bold",
    800: "800 Extra bold",
    900: "900 Black"
  };
}

function clampNumber(value, min, max, fallback, precision) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const factor = Math.pow(10, precision);
  const clamped = Math.min(max, Math.max(min, parsed));
  return Math.round(clamped * factor) / factor;
}

function normalizeHexColor(value, fallback) {
  const color = String(value || "").trim();

  if (/^#[0-9a-fA-F]{6}$/.test(color)) {
    return color;
  }

  if (/^#[0-9a-fA-F]{3}$/.test(color)) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
  }

  return fallback;
}

function hexToRgba(hex, opacityPercent) {
  const normalized = normalizeHexColor(hex, "#000000");
  const value = parseInt(normalized.slice(1), 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  const alpha = clampNumber(opacityPercent, 0, 100, 100, 0) / 100;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function mapDataviewWidth(value) {
  if (value === "full") {
    return "100%";
  }

  if (value === "theme") {
    return "unset";
  }

  return "auto";
}

function opacity(value) {
  return clampNumber(value, 0, 100, 100, 0) / 100;
}

function px(value) {
  return `${value}px`;
}

function escapeCssAttributeValue(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, " ");
}
