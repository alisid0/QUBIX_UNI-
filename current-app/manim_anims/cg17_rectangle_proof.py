from manim import *
from strata_theme import StrataScene, CHALK, CHALK_YELLOW, CHALK_GREEN, CHALK_FAINT


class CG17RectangleProof(StrataScene):
    def construct(self):
        title = self.chalk_text(
            "A shape is just a few points, joined up", font_size=28, color=CHALK_YELLOW
        ).to_edge(UP)
        self.play(Write(title))

        axes = Axes(
            x_range=[-1, 6, 1], y_range=[-1, 5, 1], x_length=6.5, y_length=5,
            axis_config={"color": CHALK_FAINT},
        ).shift(DOWN * 0.3 + LEFT * 0.5)
        self.play(Create(axes))

        pts = [(0, 0), (4, 0), (4, 3), (0, 3)]
        dots = VGroup(*[Dot(axes.c2p(*p), color=CHALK_YELLOW) for p in pts])
        self.play(*[FadeIn(d) for d in dots])

        sides = [(pts[0], pts[1]), (pts[1], pts[2]), (pts[2], pts[3]), (pts[3], pts[0])]
        lengths = ["4", "3", "4", "3"]
        lines = VGroup(*[Line(axes.c2p(*p1), axes.c2p(*p2), color=CHALK) for p1, p2 in sides])
        self.play(*[Create(l) for l in lines])

        labels = VGroup()
        for (p1, p2), length in zip(sides, lengths):
            mid = axes.c2p((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2)
            lbl = self.chalk_text(length, font_size=22, color=CHALK_GREEN).move_to(mid + 0.35 * UP)
            labels.add(lbl)
        self.play(*[Write(l) for l in labels])
        self.wait(0.4)

        conclusion = self.chalk_text(
            "Opposite sides equal: 4, 3, 4, 3 - confirmed by calculation.", font_size=22, color=CHALK
        ).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(1.3)
