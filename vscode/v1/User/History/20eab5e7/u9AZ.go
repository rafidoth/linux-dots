package main

import (
	"flag"
	"fmt"
)

func main() {
	minusK := flag.Bool("K", true, "K")
	minusO := flag.Int("O", 1, "O")
	flag.Parse()
	
	
	valueK := *minusK
	valueO := *minusO
	
	valueO++
	
	fmt.Printf("minusK: %v, minusO: %d\n", valueK, valueO)
}
