package main

import "fmt"

// func main(){
// 	graph := map[int][]int {
// 		1 : {2,3,5},
// 		2 : {1,3},
// 		3 : {1,2,4,5},
// 		4 : {3},
// 		5 : {1,3},
// 	}
// 	vis := make(map[int]bool)
// 	dfs(graph, vis, 1)
// 	fmt.Println()
// }


func dfs(g map[int][]int, vis map[int]bool, node int){
	vis[node] = true
	fmt.Printf("%d -> ",node)
	for _, neighbor := range g[node] {
		if !vis[neighbor] {
			dfs(g, vis, neighbor)
		}
	}

}


