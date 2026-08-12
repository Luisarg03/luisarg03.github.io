1. Create the host header section above HtopWindow (identity row + system line), id="identity".
2. Move system-detection JS from the below-window host details section; remove the below-window section entirely (no duplicate).
3. CommandPalette: cd /identity → /#identity.
4. Verify: npm run build + astro check; desktop 1440 (section above window, both visible first viewport after boot), mobile 390 (identity wraps, no overflow), no-JS (identity server-rendered, system '—'); skill expand + experience expand still work; boot handoff unchanged; screenshot to /tmp/opencode/qa-homepage/.
