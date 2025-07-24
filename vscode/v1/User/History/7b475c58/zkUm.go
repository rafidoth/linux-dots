package pointerserrors

import (
	"errors"
	"fmt"
)

var ErrInsufficientFund = errors.New("insufficient balance bhai")
type Stringer interface {
	String() string
}


type Bitcoin int

func (b Bitcoin) String() string{
	return fmt.Sprintf("%d BTC", b)
}

type Wallet struct {
	balance Bitcoin 
}

func (w *Wallet) Deposit(amount Bitcoin){
	w.balance += amount
} 


func (w Wallet) Balance() Bitcoin{
	return w.balance
}


func (w *Wallet) Withdraw(amount Bitcoin) error{
	if w.balance < amount {
		return  ErrInsufficientFund
	}
	w.balance -= amount
	return nil
}