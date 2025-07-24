from manim import *

class SquareToCircle(Scene):
    def construct(self):
        circle = Circle(color=RED)
        square = Square()     

        self.play(Create(square))
        self.play(Transform(square, circle))
        self.play(FadeOut(square))