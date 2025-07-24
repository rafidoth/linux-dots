package routes

import (
	"github.com/gorilla/mux"
	"github.com/rafidoth/go-book-management-system/pkg/controllers"
)



func RegisterBookStoreRoutes(router *mux.Router){
	router.HandleFunc("/api/v1/books", controllers.GetBooks).Methods("GET")

	router.HandleFunc("/api/v1/books/{id}", controllers.GetBookById).Methods("GET")

	router.HandleFunc("/api/v1/books", controllers.CreateBook).Methods("POST")

	router.HandleFunc("/api/v1/books/{id}", controllers.UpdateBook).Methods("PUT")

	router.HandleFunc("/api/v1/books/{id}", controllers.DeleteBook).Methods("DELETE")
}
