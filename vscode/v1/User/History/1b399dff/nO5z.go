package api

import (
	"database/sql"
	"net/http"
)

type Server struct {
	addr string
}

func NewServer(addr string, db *sql.DB) *Server {
	return &Server{
		addr: addr,
	}
}

func (s *Server) Start() error {
	router := http.NewServeMux()
	router.HandleFunc("/api/v1/", v1Handler)
	return http.ListenAndServe(s.addr, router)
}
