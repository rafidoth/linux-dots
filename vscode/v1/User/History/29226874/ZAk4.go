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
	t.Run("Rectangle", func(t *testing.T) {
		r := Rectangle{10.0, 20.0}
		got := r.Area()
		want := 200.0
		
		if got != want {
			t.Errorf("got %.2f want %.2f",got,want)
		}
	})

	t.Run("Circle", func(t *testing.T) {
		c := Circle{10.0}
		got := c.Area()
		want := 314.16
		
		if got != want {
			t.Errorf("got %.2f want %.2f",got,want)
		}
	})
}