# Room art

Nine isometric rooms for the Superstore floor plan. Production uses these exact
lowercase `.webp` filenames. Source art can be larger, but the published files
are prepared for the web by `scripts/prepare-room-art.mjs`:

| File | Room | Has screens? |
|---|---|---|
| `goods-in.webp` | Goods In | yes — scale display |
| `stock-room.webp` | Stock Room | no |
| `customer-desk.webp` | Customer Desk | yes — card terminal, monitor |
| `aisles.webp` | Aisles | no |
| `tills.webp` | Tills | yes — till screens, card readers |
| `data-office.webp` | Data Office | yes — monitors |
| `reporting.webp` | Reporting | yes — monitor, presentation display |
| `boardroom.webp` | Boardroom | yes — presentation screen |
| `role-floors.webp` | Role Floors | no |

The name is the room `id` in `src/lib/game/store-map.js`. Nothing else needs
changing when art arrives: the view resolves `/rooms/{id}.webp` and falls back to
the deterministic SVG plan if a file is missing, so the map works with none,
some, or all of these present.

Screens must be flat `#100E0A` with no gradient or reflection, because live
content is composited over them. Anything with generated text, a chart or a
table baked into it needs regenerating: those are technical visuals and they are
drawn in the browser, not in the art.
