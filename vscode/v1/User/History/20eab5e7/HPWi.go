package main

import (
	"flag"
	"fmt"
)

func main() {
	minusK := flag.Bool("k", true, "k flag")
	minusO := flag.Int("o", 1, "o flag")
	flag.Parse()
	
	
	valueK := *minusK
	valueO := *minusO
	
	value0++
	
	fmt.Printf("minusK: %v, minusO: %d\n", valueK, valueO)
}
