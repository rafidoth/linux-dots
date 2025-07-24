package main

import (
	"flag"
	"fmt"
)

func main() {
	minusK := flag.Bool("K", true, "k flag")
	minusO := flag.Int("O", 1, "o flag")
	flag.Parse()
	
	
	valueK := *minusK
	valueO := *minusO
	
	valueO++
	
	fmt.Printf("minusK: %v, minusO: %d\n", valueK, valueO)
}
