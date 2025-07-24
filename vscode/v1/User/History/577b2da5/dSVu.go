package main

import "fmt"

// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3

type Position struct {
	rowNo int
	colNo int
}

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
				position := Position{row,col}
				DFS(grid,visited, position)
				islandCount++
			}
		}
	}

	return islandCount
}

func insideGrid(position Position, grid [][]byte) bool {
	if
		position.rowNo < 0 ||
		position.colNo < 0 ||
		position.rowNo >= len(grid) ||
		position.colNo >= len(grid[0]) {
		return false
	}
	return true
}


func DFS(grid [][]byte,visited [][]bool, position Position){
	if insideGrid(position, grid) &&
		!visited[position.rowNo][position.colNo] {
		visited[position.rowNo][position.colNo] = true
	}


	directions := []Position{
		{position.rowNo + 1, position.colNo},
		{position.rowNo - 1, position.colNo},
		{position.rowNo, position.colNo + 1},
		{position.rowNo, position.colNo - 1},
	}

	for _, direction := range directions {
		if !visited[position.rowNo][position.colNo] {
			DFS(grid, visited, direction)
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


