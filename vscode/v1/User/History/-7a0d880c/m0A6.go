package main

import (
	"bytes"
	"fmt"
)



func Greet(writer *bytes.Buffer, str string){
	fmt.Fprintf(writer, "Hello, %s", str)
}