from manim import *

class SquareToCircle(Scene):
    def construct(self):
        circle = Circle(color=RED)
        circle.set_fill(RED_C, opacity=0.7)

        square = Square()     


        self.play(Create(square))
        self.play(Transform(square, circle))
        self.play(FadeOut(square))