package api

import (
	"fmt"
	"net/http"
)

func v1Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("Request received: %v\n", r)
}
