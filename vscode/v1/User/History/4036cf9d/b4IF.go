package pointerserrors



type Bitcoin int



type Wallet struct {
	balance int
}



func (w *Wallet) Deposit(amount int){
	w.balance += amount
} 


func (w Wallet) Balance() int{
	return w.balance
}