from manim import *
from strata_theme import StrataScene, CHALK, CHALK_YELLOW, CHALK_GREEN, CHALK_FAINT


class CG08TheatreSeats(StrataScene):
    def construct(self):
        title = self.chalk_text("One line can't hold everything", font_size=32, color=CHALK_YELLOW)
        title.to_edge(UP)
        self.play(Write(title))

        rows = VGroup()
        labels = VGroup()
        lines = []
        for i, name in enumerate(["Row A", "Row B", "Row C"]):
            line = NumberLine(x_range=[0, 14, 2], length=8, color=CHALK_FAINT)
            line.shift(UP * (1.3 - i * 1.1))
            dot = Dot(line.n2p(12), color=CHALK_YELLOW)
            lbl = self.chalk_text(name, font_size=20).next_to(line, LEFT)
            lines.append(line)
            rows.add(line, dot)
            labels.add(lbl)

        self.play(*[Create(r) for r in rows], *[Write(l) for l in labels])
        q = self.chalk_text("\"Seat 12\" - which one?", font_size=24, color=CHALK_GREEN).to_edge(DOWN)
        self.play(Write(q))
        self.wait(1.2)
        self.play(FadeOut(rows), FadeOut(labels), FadeOut(q))

        axes = Axes(
            x_range=[0, 14, 2], y_range=[0, 4, 1], x_length=8, y_length=4,
            axis_config={"color": CHALK_FAINT},
        )
        x_label = self.chalk_text("seat", font_size=20).next_to(axes.x_axis, RIGHT)
        y_label = self.chalk_text("row", font_size=20).next_to(axes.y_axis, UP)
        self.play(Create(axes), Write(x_label), Write(y_label))

        point = Dot(axes.c2p(12, 3), color=CHALK_YELLOW)
        plabel = self.chalk_text("row 3, seat 12", font_size=22, color=CHALK_GREEN).next_to(point, UR)
        self.play(FadeIn(point), Write(plabel))
        self.wait(1.0)

        final = self.chalk_text("Two numbers at once - exactly one seat.", font_size=24, color=CHALK).to_edge(DOWN)
        self.play(Write(final))
        self.wait(1.2)
