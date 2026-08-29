"""
Board 1035 — The simplest thing you can draw.
Clean number line: extends full width, numbered ticks, infinity dots at ends.
No titles, no text overlays — just the line.
"""
from manim import *
from strata_theme import StrataScene, TEXT_DARK, ACCENT


class CG01NumberLine(StrataScene):
    def construct(self):
        line = NumberLine(
            x_range=[-5, 6, 1],
            length=10,
            include_numbers=True,
            numbers_to_include=range(-4, 6),
            color=TEXT_DARK,
            stroke_width=2.5,
            font_size=28,
            include_tip=False,
        )
        line.move_to(ORIGIN)

        # Infinity dots at both ends
        left_dot = Dot(line.n2p(-5), color=TEXT_DARK, radius=0.08)
        right_dot = Dot(line.n2p(6), color=TEXT_DARK, radius=0.08)

        self.play(Create(line), FadeIn(left_dot), FadeIn(right_dot))
        self.wait(0.6)

        # Plot a point at x=3
        point = Dot(line.n2p(3), color=ACCENT, radius=0.12)
        self.play(FadeIn(point))
        self.wait(1.0)
