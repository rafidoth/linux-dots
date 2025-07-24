package main

import (
	"fmt"

	"github.com/rafidoth/jigao-api/cmd/api"
)

func main() {
	fmt.Println("Starting server on :8080")
	api.NewServer(":8080", nil).Start()
}