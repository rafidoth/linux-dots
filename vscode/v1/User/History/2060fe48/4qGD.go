package utils

import (
	"io"
	"net/http"
)



func ParseBody(r *http.Request, x interface{}){
	if body, err := io.ReadAll(r.Body); err != nil{
	}
}