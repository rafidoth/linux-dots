package structmethodinterface

import "testing"




func TestPerimeter( t *testing.T){
	got := Perimeter(10.0, 20.0)
	want := 60.0
}