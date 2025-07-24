package config

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	db * gorm.DB
)


func Connect() {
  dsn := "root:my-secret-pw@tcp(127.0.0.1:3306)/UNIVERSITY?charset=utf8mb4&parseTime=True&loc=Local"
  db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
  if err != nil{
	panic(err)
  }
  
}