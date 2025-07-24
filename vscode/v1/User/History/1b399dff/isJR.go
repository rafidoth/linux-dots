package api

import (
	"database/sql"
	"net/http"
)

type Server struct {
	addr string
	db   *sql.DB
}

func NewServer(addr string, db *sql.DB) *Server {
	return &Server{
		addr: addr,
		db:   db,
	}
}


func (s *Server) Start() error {
	router := http.NewServeMux()
	return http.ListenAndServe(s.addr, nil)
}
