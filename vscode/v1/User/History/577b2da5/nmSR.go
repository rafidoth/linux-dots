package main

import "fmt"


func numIslands(grid [][]byte) int {
	totalrows := len(grid)
	totalcols := len(grid[0])


	// creating a visited grid to track which nodes are already visited
	visited := make([][]bool, totalrows)
	for i := range visited {
		visited[i] = make([]bool, totalcols)
	}

	// counting the island
	islandCount := 0

	for row := range grid {
		for col:= range grid[row]{
			if !visited[row][col] && grid[row][col]== '1'{
				DFS(grid,&visited, row, col)
				islandCount++
			}
		}
	}
	return islandCount
}

func insideGrid(row,col int, grid [][]byte) bool {
	if
		row < 0 ||
		col < 0 ||
		row >= len(grid) ||
		col >= len(grid[0]) {
		return false
	}
	return true
}


type Position struct{
	r int
	c int
}


func DFS(grid [][]byte, visited *[][]bool, row,col int){
	(*visited)[row][col] = true

	fmt.Printf("Address of slice variable: %p\n", visited)
	adjacents := []Position{
		{row+1, col},
		{row-1, col},
		{row, col+1},
		{row, col-1},
	}

	for _, adjacent := range adjacents{
		r := adjacent.r
		c := adjacent.c
		if insideGrid(r,c,grid) && !(*visited)[r][c] && grid[r][c]=='1'{
			DFS(grid,visited, r,c)
		}
	}
}



func main(){
	grid := [][]byte{
		{'1', '1', '0', '0', '0'},
		{'1', '1', '0', '0', '0'},
		{'0', '0', '1', '0', '0'},
		{'0', '0', '0', '1', '1'},
	}
	fmt.Println(numIslands(grid))
}



// func Dfs(g [][]byte, vis map[int]bool, node int){
// 	vis[node] = true
// 	fmt.Printf("%d -> ",node)
// 	for _, neighbor := range g[node] {
// 		if !vis[neighbor] {
// 			dfs(g, vis, neighbor)
// 		}
// 	}

// }


