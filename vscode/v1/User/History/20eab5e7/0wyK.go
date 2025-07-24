package main

import (
	"flag"
	"fmt"
)

func main() {
	minusK := flag.Bool("K", true, "K is a boolean flag")
	minusO := flag.Int("O", 1, "O is an integer flag")
	flag.Parse()
	
	
	valueK := *minusK
	valueO := *minusO
	
	valueO++
	
	fmt.Printf("minusK: %v, minusO: %d\n", valueK, valueO)
}
