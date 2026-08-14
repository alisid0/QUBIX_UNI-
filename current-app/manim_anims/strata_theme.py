import os
from manim import *

# Theme selected at render time:  STRATA_THEME=light|dark manim render ...
# Colours are matched to the app's --qx tokens (qubix-tokens.css) so a rendered
# GIF sits on the same figure surface as the in-app SVG coordinate plane in that
# theme. Render each scene twice (light + dark) → two GIFs the Reader swaps by
# the active theme. Legacy CHALK_* role-names are remapped onto the palette so
# the older coordinate-geometry scenes render on-brand without a rewrite.
_THEME = os.environ.get("STRATA_THEME", "light").lower()

_PALETTES = {
    "light": dict(
        BG="#F4F0E7",       # --qx-surface-2
        INK="#241F16",      # --qx-text
        INK2="#57503F",     # --qx-text-2
        DIM="#726A58",      # --qx-text-dim
        FAINT="#9E947E",    # --qx-text-faint
        ACCENT="#A85A34",   # --qx-accent (clay)
        GREEN="#3E9E2A",    # --qx-green
        RED="#CF3423",      # --qx-danger
    ),
    "dark": dict(
        BG="#201E1A",       # --qx-surface-2 as rendered over --qx-bg
        INK="#F2EADB",      # --qx-text
        INK2="#CFC6B4",     # --qx-text-2
        DIM="#A79E8B",      # --qx-text-dim
        FAINT="#8C8573",    # --qx-text-faint
        ACCENT="#D28A5E",   # --qx-accent (clay)
        GREEN="#6BC93F",    # --qx-green
        RED="#EC4B31",      # --qx-danger
    ),
}
_P = _PALETTES.get(_THEME, _PALETTES["light"])

# Figure surface
BOARD_BG = _P["BG"]

# New-style names (cg01 number line)
TEXT_DARK = _P["INK"]
TEXT_MED = _P["INK2"]
ACCENT = _P["ACCENT"]
ACCENT_WARM = _P["RED"]
GRID = _P["FAINT"]

# Legacy chalk role-names, remapped onto the themed palette
CHALK = _P["INK"]            # main text / ink
CHALK_YELLOW = _P["ACCENT"]  # primary highlight (dots, titles) → clay
CHALK_GREEN = _P["GREEN"]    # secondary / positive text
CHALK_BLUE = _P["INK2"]      # secondary geometric ink (no blue in the palette)
CHALK_FAINT = _P["DIM"]      # axes / number lines / faint guides


class StrataScene(Scene):
    def setup(self):
        self.camera.background_color = BOARD_BG

    def chalk_text(self, text, **kwargs):
        kwargs.setdefault("color", TEXT_DARK)
        kwargs.setdefault("font_size", 28)
        return Text(text, font="Helvetica Neue, Arial, sans-serif", **kwargs)

    def axes(self, x_range=None, y_range=None, x_length=7, y_length=4, **kwargs):
        """Quick clean axes matching the CoordinatePlane component."""
        from manim import Axes
        kwargs.setdefault("axis_config", {"color": TEXT_DARK, "stroke_width": 2})
        kwargs.setdefault("x_axis_config", {"numbers_to_include": range(x_range[0], x_range[1]+1) if x_range else None})
        kwargs.setdefault("y_axis_config", {"numbers_to_include": range(y_range[0], y_range[1]+1) if y_range else None})
        return Axes(x_range=x_range, y_range=y_range, x_length=x_length, y_length=y_length, **kwargs)
