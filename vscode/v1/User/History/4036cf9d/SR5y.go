package pointerserrors

import "fmt"

type Stringer interface {
	String() string
}


type Bitcoin int

type Wallet struct {
	balance Bitcoin 
}

func (w *Wallet) Deposit(amount Bitcoin){
	w.balance += amount
} 


func (w Wallet) Balance() Bitcoin{
	return w.balance
}

func (b Bitcoin) String() string{
	return fmt.Sprintf("%d BTC", b)
}