from manim import *
from strata_theme import StrataScene, CHALK, CHALK_YELLOW, CHALK_GREEN, CHALK_BLUE, CHALK_FAINT


class CG15DistancePythagoras(StrataScene):
    def construct(self):
        title = self.chalk_text(
            "Borrowing a triangle to measure a diagonal", font_size=28, color=CHALK_YELLOW
        ).to_edge(UP)
        self.play(Write(title))

        axes = Axes(
            x_range=[-1, 7, 1], y_range=[-1, 6, 1], x_length=7, y_length=5.5,
            axis_config={"color": CHALK_FAINT},
        ).shift(DOWN * 0.3)
        self.play(Create(axes))

        A = axes.c2p(1, 1)
        B = axes.c2p(5, 4)
        corner = axes.c2p(5, 1)

        dotA = Dot(A, color=CHALK_YELLOW)
        dotB = Dot(B, color=CHALK_YELLOW)
        labelA = self.chalk_text("A (1,1)", font_size=20).next_to(dotA, DL, buff=0.15)
        labelB = self.chalk_text("B (5,4)", font_size=20).next_to(dotB, UR, buff=0.15)
        self.play(FadeIn(dotA), FadeIn(dotB), Write(labelA), Write(labelB))

        leg_x = Line(A, corner, color=CHALK_GREEN)
        leg_y = Line(corner, B, color=CHALK_BLUE)
        hyp = Line(A, B, color=CHALK)

        self.play(Create(leg_x))
        dx_label = self.chalk_text("Δx = 4", font_size=20, color=CHALK_GREEN).next_to(leg_x, DOWN, buff=0.15)
        self.play(Write(dx_label))

        self.play(Create(leg_y))
        dy_label = self.chalk_text("Δy = 3", font_size=20, color=CHALK_BLUE).next_to(leg_y, RIGHT, buff=0.15)
        self.play(Write(dy_label))

        self.play(Create(hyp))
        self.wait(0.4)

        formula = self.chalk_text("d = √(4² + 3²) = √25 = 5", font_size=26, color=CHALK).to_edge(DOWN)
        self.play(Write(formula))
        self.wait(1.3)
