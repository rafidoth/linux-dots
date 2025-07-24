package api

import "net/http"



func RunServer(){
	http.HandleFunc("/api/v1", handle)	
}