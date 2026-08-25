# Room art

Nine isometric rooms for the Superstore floor plan. Save them here with these
exact names, all lowercase, `.png`, 1024 × 1024:

| File | Room | Has screens? |
|---|---|---|
| `goods-in.png` | Goods In | yes — scale display |
| `stock-room.png` | Stock Room | no |
| `customer-desk.png` | Customer Desk | yes — card terminal, monitor |
| `aisles.png` | Aisles | no |
| `tills.png` | Tills | yes — till screens, card readers |
| `data-office.png` | Data Office | yes — monitors |
| `reporting.png` | Reporting | yes — monitor, presentation display |
| `boardroom.png` | Boardroom | yes — presentation screen |
| `role-floors.png` | Role Floors | no |

The name is the room `id` in `src/lib/game/store-map.js`. Nothing else needs
changing when art arrives: the view resolves `/rooms/{id}.png` and falls back to
the deterministic SVG plan if a file is missing, so the map works with none,
some, or all of these present.

Screens must be flat `#100E0A` with no gradient or reflection, because live
content is composited over them. Anything with generated text, a chart or a
table baked into it needs regenerating: those are technical visuals and they are
drawn in the browser, not in the art.
