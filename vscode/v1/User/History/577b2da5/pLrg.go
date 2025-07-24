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
			// if its an unvisited land we can see further otherwise not
			if !visited[row][col] && grid[row][col]== '1'{
				DFS(grid,&visited, row, col)
				// when a full traversal is completed that means
				// an island found hence incrementing the islancCount
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


	// storing all 4 possible neighbors of the current node
	// for using a single loop to make recursive call.
	adjacents := []Position{
		{row+1, col},
		{row-1, col},
		{row, col+1},
		{row, col-1},
	}

	for _, adjacent := range adjacents{
		r := adjacent.r
		c := adjacent.c
		// if the node is inside the grid and not visited land then
		// we can further go visiting that node
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

