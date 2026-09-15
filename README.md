# Advice concept

A one-off design concept page, built as a proposal artefact. **This is not a live
company website** — it carries a permanent on-page label saying so, and is served
with `noindex, nofollow`.

- Single page, `index.html`
- GSAP 3.12.5 + ScrollTrigger, vendored in `vendor/` (no CDN — it must render on
  untrusted conference wifi)
- Work Sans variable, self-hosted in `fonts/` (OFL)
- No third-party requests at runtime
- All imagery is a labelled placeholder; no real photography or logos
- Contact CTA is intentionally non-functional

Local preview:

```
python3 -m http.server 8765
```
