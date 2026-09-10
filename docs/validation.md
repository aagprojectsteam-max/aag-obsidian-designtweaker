# Validation and compatibility

The first public package declares Obsidian 1.13.7 as a conservative supported baseline. Earlier private versions' minimum-version claim is not reused as test evidence. The installed 1.13.7 application archive exposes the host API facilities used by the plugin. No host implementation or archive is distributed here.

Run `npm run verify` with the pinned Node/lockfile toolchain. Publication tests reject missing/corrupt assets, version/ID mismatches, forbidden files, private path/credential patterns and prefixed or mismatched tags. The release directory must contain exactly three byte-identical files. Scans report file/category only and are heuristic checks, not a guarantee against every unknown secret pattern.

UI/theme/OS-specific behavior must be assessed separately. A disposable plugin directory verifies installation layout only; it is not a running Obsidian integration test. The manifest permits mobile, but mobile GUI coverage is not claimed. BRAT end-to-end testing requires a real GitHub release and remains pending until one is explicitly published.

## DesignTweaker tests

Settings tests load the actual plugin class with an Obsidian API stub. They verify defaults, valid settings, malformed values and legacy migration without a real vault. CSS checks cover expected gated rules and absence of remote asset imports. These are not pixel/visual regression tests.
