package structmethodinterface

import "testing"




func TestPerimeter( t *testing.T){
	got := Perimeter(Rectangle{10.0, 20.0})
	want := 60.0
	
	if got != want {
		t.Errorf("got %.2f want %.2f",got,want)
	}
}

func TestArea( t *testing.T){
	
	areaTests := []struct {
			name    string
			shape   Shape
			hasArea float64
		}{
			{name: "Rectangle", shape: Rectangle{Width: 12, Height: 6}, hasArea: 72.0},
			{name: "Circle", shape: Circle{Radius: 10}, hasArea: 314.1592653589793},
			{name: "Triangle", shape: Triangle{Base: 12, Height: 6}, hasArea: 36.0},
	}
	
	for _,tt := range areaTests {
		t.Run(tt.name,func(t *testing.T) {
			got := tt.shape.Area()
			if got != tt.hasArea{
				t.Errorf("%#v got %g want %g", tt.shape, got, tt.hasArea)
			} 
		})
	}
}