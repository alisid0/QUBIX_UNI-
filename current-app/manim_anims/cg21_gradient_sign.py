from manim import *
from strata_theme import StrataScene, CHALK_YELLOW, CHALK_GREEN, CHALK_FAINT


class CG21GradientSign(StrataScene):
    def construct(self):
        title = self.chalk_text(
            "Uphill or downhill, left to right", font_size=28, color=CHALK_YELLOW
        ).to_edge(UP)
        self.play(Write(title))

        axes_l = Axes(
            x_range=[-4, 4, 1], y_range=[-4, 4, 1], x_length=5, y_length=5,
            axis_config={"color": CHALK_FAINT},
        ).shift(LEFT * 3.3 + DOWN * 0.3)
        axes_r = Axes(
            x_range=[-4, 4, 1], y_range=[-4, 4, 1], x_length=5, y_length=5,
            axis_config={"color": CHALK_FAINT},
        ).shift(RIGHT * 3.3 + DOWN * 0.3)
        self.play(Create(axes_l), Create(axes_r))

        def f_left(x):
            return 0.7 * x

        def f_right(x):
            return -0.7 * x

        line_l = axes_l.plot(f_left, x_range=[-4, 4], color=CHALK_GREEN)
        line_r = axes_r.plot(f_right, x_range=[-4, 4], color=CHALK_YELLOW)
        self.play(Create(line_l), Create(line_r))

        dot_l = Dot(axes_l.c2p(-4, f_left(-4)), color=CHALK_GREEN)
        dot_r = Dot(axes_r.c2p(-4, f_right(-4)), color=CHALK_YELLOW)
        self.play(FadeIn(dot_l), FadeIn(dot_r))
        self.play(MoveAlongPath(dot_l, line_l), MoveAlongPath(dot_r, line_r), run_time=3, rate_func=linear)

        label_l = self.chalk_text("m = +0.7 - climbs", font_size=22, color=CHALK_GREEN).next_to(axes_l, DOWN)
        label_r = self.chalk_text("m = −0.7 - falls", font_size=22, color=CHALK_YELLOW).next_to(axes_r, DOWN)
        self.play(Write(label_l), Write(label_r))
        self.wait(1.3)
