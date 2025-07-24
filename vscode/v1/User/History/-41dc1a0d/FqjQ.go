package cmd



type application struct{
	config config
}


type config struct{ 
	addr string
}


func (app *application)run() error{
	srv := &app.config.addr
}