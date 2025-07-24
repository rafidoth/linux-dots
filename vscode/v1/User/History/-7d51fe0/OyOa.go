package database

type ClientProfile struct{
	FirstName string
	LastName string
	Email string
	Password string
}


func NewClientProfile(firstName, lastName, email, password string) *ClientProfile {
	return &ClientProfile{
		FirstName: firstName,
		LastName: lastName,
		Email: email,
		Password: password,
	}
}


