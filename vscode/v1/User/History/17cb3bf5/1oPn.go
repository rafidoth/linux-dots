package main

import "fmt"

func main(){
	visited := make([][]bool, 5)
	for _, v := range visited {
		v = make([]bool,4)
	}
	fmt.Println(visited)
	for _, row:= range visited {
		for _, c := range row {
			if c {
				fmt.Print("T ")
			}else{
				fmt.Print("F ")
			}
			fmt.Println()
		} 
	}
}