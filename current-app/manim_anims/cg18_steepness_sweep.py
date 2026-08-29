from manim import *
from strata_theme import StrataScene, CHALK, CHALK_YELLOW, CHALK_GREEN, CHALK_FAINT


class CG18SteepnessSweep(StrataScene):
    def construct(self):
        title = self.chalk_text("How much a line leans", font_size=30, color=CHALK_YELLOW).to_edge(UP)
        self.play(Write(title))

        axes = Axes(
            x_range=[-6, 6, 1], y_range=[-6, 6, 1], x_length=6.5, y_length=6.5,
            axis_config={"color": CHALK_FAINT},
        )
        self.play(Create(axes))

        quad_positions = {"I": (3, 3), "II": (-3, 3), "III": (-3, -3), "IV": (3, -3)}
        qtext = VGroup(*[
            self.chalk_text(k, font_size=20, color=CHALK_FAINT).move_to(axes.c2p(*v))
            for k, v in quad_positions.items()
        ])
        self.play(*[FadeIn(t) for t in qtext])

        def f(x):
            return 0.5 * x + 2

        line = axes.plot(f, x_range=[-6, 4], color=CHALK)
        dot = Dot(axes.c2p(-6, f(-6)), color=CHALK_YELLOW)
        self.play(Create(line))
        self.play(FadeIn(dot))
        self.play(MoveAlongPath(dot, line), run_time=3, rate_func=linear)
        self.wait(0.3)

        note = self.chalk_text(
            "Passes through I, II, III - never IV.", font_size=22, color=CHALK_GREEN
        ).to_edge(DOWN)
        self.play(Write(note))
        self.wait(1.3)
