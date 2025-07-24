package pointerserrors




type Wallet struct {
	balance int
}



func (w Wallet) Deposit(amount int){

} 


func (w Wallet) Balance() int{
	return w.balance
}