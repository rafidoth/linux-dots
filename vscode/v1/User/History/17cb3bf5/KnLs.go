package main

import "fmt"

func main(){
	visited := make([][]bool, 5)
	for _, row:= range visited {
		for _, c := range row {
			if !c {
				fmt.Print(c," ")
			}
			fmt.Println()
		} 
	}
}