package main

import (
	"bytes"
	"testing"
)



func TestGreet(t *testing.T){
	buffer := bytes.Buffer{}
	Greet(&buffer, "Rafi")

	got := buffer.String()
	want := "Hello, Rafi"


	if got!= want {
		t.Errorf("got %q want %q", got, want)
	}
}