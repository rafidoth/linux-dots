package main

import (
	"bytes"
	"fmt"
)



func Greet(writer *bytes.Buffer, str string){
	fmt.Printf("Hello, %s", str)
}