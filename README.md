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

## Imagery

**None of the photography is Hybrid Advice's.** Hybrid publishes no photographs
of the four hubs, their offices, or the hub principals — the only photographs on
hybridadvice.com are headshots of the central team and one abstract background,
and of the four hub firms' own sites, one has no photography, one has only
tinted stock, and one no longer resolves. Every plate here is therefore a
stand-in, labelled as such on the page.

Stand-ins are from Unsplash (Unsplash Licence — free for commercial use,
attribution not required, recorded here for traceability):

| Slot | Unsplash photo ID |
|---|---|
| Hero — principal portrait | `photo-1782906140217-57c91b882464` |
| Southernhay | `photo-1595320078268-43862afaa9a5` |
| D'Arblay | `photo-1652049133878-fefb2a6a2130` |
| Miraclair | `photo-1687011291606-50309ef62e72` |
| Aspirations | `photo-1699703493058-14e1141b9e61` |

All are graded in CSS toward the sage/clay palette so a set of unrelated frames
reads as one commission.

`assets/hybrid-logo-*.png` are Hybrid Advice's own logo files, used here in a
concept made for Hybrid Advice.
