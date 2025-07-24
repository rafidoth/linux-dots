from manim import *

class CodeExecutionAnimation(Scene):
    def construct(self):
        # Configuration for the scene
        self.camera.background_color = "#1E1E1E"
        
        # Sample Python code to demonstrate
        code_str = '''def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = \
                arr[j+1], arr[j]
    return arr'''

        # Create code text on the left
        code = Code(
            code=code_str,
            tab_width=4,
            background="window",
            language="python",
            font="Monospace",
            font_size=24,
            line_spacing=0.8,
            style="monokai"
        ).scale(0.85)
        
        # Position code on the left side
        code.to_edge(LEFT, buff=0.5)
        code.to_edge(UP, buff=0.5)

        # Create sample array for visualization
        sample_arr = [5, 2, 8, 1, 9]
        squares = VGroup(*[
            Square(side_length=0.8, fill_opacity=1, fill_color=BLUE)
            .set_stroke(WHITE, 2)
            for _ in range(len(sample_arr))
        ]).arrange(RIGHT, buff=0.2)
        
        # Add numbers to squares
        numbers = VGroup(*[
            Text(str(num), font="Arial", font_size=36)
            for num in sample_arr
        ])
        for num, square in zip(numbers, squares):
            num.move_to(square)
        
        # Group squares and numbers
        array_group = VGroup(squares, numbers)
        array_group.shift(RIGHT * 3 + UP * 1.5)
        
        # Animation sequence
        self.play(Write(code))
        self.wait(0.5)
        self.play(Create(squares), Write(numbers))
        
        # Highlight and animate each line while showing sorting
        arr = sample_arr.copy()
        n = len(arr)
        
        # Highlight first line and function definition
        self.play(code.code.get_line_wrapper(0).animate.set_color(YELLOW))
        self.wait(1)
        
        # Animate the sorting process
        for i in range(n):
            # Highlight outer loop line
            self.play(
                code.code.get_line_wrapper(1).animate.set_color(YELLOW),
                code.code.get_line_wrapper(0).animate.set_color(WHITE)
            )
            
            for j in range(n-i-1):
                # Highlight comparison line
                self.play(
                    code.code.get_line_wrapper(2).animate.set_color(YELLOW),
                    code.code.get_line_wrapper(1).animate.set_color(WHITE)
                )
                
                # Highlight elements being compared
                squares[j].set_fill(RED)
                squares[j+1].set_fill(RED)
                
                if arr[j] > arr[j+1]:
                    # Highlight swap line
                    self.play(
                        code.code.get_line_wrapper(3).animate.set_color(YELLOW),
                        code.code.get_line_wrapper(2).animate.set_color(WHITE)
                    )
                    
                    # Animate the swap
                    self.play(
                        numbers[j].animate.move_to(squares[j+1]),
                        numbers[j+1].animate.move_to(squares[j])
                    )
                    
                    # Update array and numbers
                    arr[j], arr[j+1] = arr[j+1], arr[j]
                    numbers[j], numbers[j+1] = numbers[j+1], numbers[j]
                
                # Reset colors
                squares[j].set_fill(BLUE)
                squares[j+1].set_fill(BLUE)
                self.wait(0.3)
        
        # Final wait and cleanup
        self.play(
            code.code.get_line_wrapper(4).animate.set_color(YELLOW),
            code.code.get_line_wrapper(3).animate.set_color(WHITE)
        )
        self.wait(1)
        
        # Success indication
        final_squares = squares.copy().set_fill(GREEN)
        self.play(Transform(squares, final_squares))
        self.wait(1)

class SocialMediaConfig:
    def setup(self):
        # Configure for 1080p with 16:9 aspect ratio (good for social media)
        config.frame_width = 16
        config.frame_height = 9
        config.pixel_height = 1080
        config.pixel_width = 1920
        config.video_dir = "./media"