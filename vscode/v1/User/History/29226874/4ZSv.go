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
	
	areaTests:= [] struct{
		shape Shape
		want float64
	}{
		{Rectangle{12, 6}, 72.0},
		{Circle{10}, 314.1592653589793},
		{Triangle{12, 6}, 36.0},
	}
		
	checkArea := func (t testing.TB, shape Shape, want float64){
		t.Helper()
		got := shape.Area()
		if got != want {
			t.Errorf("got %g, want %g", got,want)
		}
	}
	
	t.Run("Rectangle", func(t *testing.T) {
		r := Rectangle{10.0, 20.0}
		checkArea(t,r,200.00)
	})

	t.Run("Circle", func(t *testing.T) {
		c := Circle{10.0}
		checkArea(t,c,314.1592653589793)
	})
}