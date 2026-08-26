# Object sheets

Nine sheets of separate objects on transparent backgrounds. Save them here with
these exact names, all lowercase, `.png`, 1024 × 1024:

| File | Sheet | Has screens? |
|---|---|---|
| `props-workstations.png` | Monitors, towers, laptops, keyboards | yes |
| `props-servers.png` | Racks, switches, patch panels, UPS | no — indicator LEDs only |
| `props-terminals.png` | Tills, card readers, receipt printers, scanners | yes |
| `props-measurement.png` | Scales, jugs, probes, sensor boxes | yes — blank displays |
| `props-storage.png` | Pallets, crates, shelving, trolleys, ladders | no |
| `props-coldchain.png` | Cold room door, fridges, temperature sensors | yes — blank displays |
| `props-paper.png` | Clipboards, binders, filing cards, receipt rolls | no |
| `props-office.png` | Desks, chairs, plants, whiteboard, pinboard | no |
| `props-markers.png` | Tags, warning triangle, padlocks, lamps, tape | no |

Objects need clear space around each one so they can be cut apart into
individual sprites. Everything paper must be blank: no writing, ruling or print.

## How these assets are used

The sheets are source material, not page backgrounds. A prop is cut out and
placed only when it represents a real object in the task: a scanner at a till,
a scale in Goods In, a server in a lineage path. Labels, values, charts, code,
tables, warning states and completion state remain live HTML/SVG so they stay
legible, accessible and truthful to the exercise data.

Room `.webp` files belong to navigation and location context. Small SVG
`PixelAsset` symbols belong to semantic data paths (source → activity → output).
Neither is used to fill an otherwise empty panel. Until a prop sheet exists and
has been reviewed, missions keep their current browser-drawn workstations rather
than fabricating a substitute sprite.
