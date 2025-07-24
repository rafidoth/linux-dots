from manim import *

class SquareToCircle(Scene):
    def construct(self):
        circle = Circle(color=RED)
        circle.set_fill(RED_C, opacity=0.7)

        square = Square()     
        square.set_fill(BLUE_B, opacity=0.7)


        self.play(Create(circle),Transform(circle, square))
        self.play(FadeOut(square))