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
}