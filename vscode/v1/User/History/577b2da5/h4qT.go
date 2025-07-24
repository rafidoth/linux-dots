package main

import "fmt"

// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3


func numIslands(grid [][]byte) int {
	totalrows := len(grid)
	totalcols := len(grid[0])

	visited := make([][]bool, totalrows)
	for i := range visited {
		visited[i] = make([]bool, totalcols)
	}

	islandCount := 0

	for row := range grid {
		for col:= range grid[row]{
			if !visited[row][col]{
				DFS(grid,visited, row, col)
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


type Position {
	r int
	c int
}


func DFS(grid [][]byte,visited [][]bool, row,col int){
	visited[row][col] = true

	adjacents := []Position{
		{row+1, col},
		{row-1, col},
		{row, col+1},
		{row, col-1},
	}

	for _, adjacent := range adjacents{
		r := adjacent.r
		c := adjacent.c
		if !visited[r][c] && grid[r][c]=='1'{
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


