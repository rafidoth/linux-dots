package main

import "fmt"


func main(){
	hello()
}

func hello(){
	bs := []byte{71, 111}
	fmt.Println("%s", bs) // Output: Go
}

