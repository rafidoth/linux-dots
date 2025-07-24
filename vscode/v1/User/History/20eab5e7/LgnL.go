package main

import "flag"

func main() {
	minusK := flag.Bool("k", true, "k flag")
	minusO := flag.Int("o", 1, "o flag")
	flag.Parse()
}
