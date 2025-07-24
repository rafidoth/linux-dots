package structmethodinterface




type Rectangle struct {
	Width float64
	Height float64	
}


func Perimeter(r Rectangle) float64 {
	return 2*(r.Height+r.Width)
}


func Area(x float64, y float64) float64 {
	return x*y
}