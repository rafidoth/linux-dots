package api

import (
	"log"
	"net/http"
)

func RunServer() {
	http.HandleFunc("/api/v1", handleClientProfile)

	log.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))

}
