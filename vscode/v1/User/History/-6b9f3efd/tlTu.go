package pointerserrors

import (
	"testing"
)

func TestWallet(t *testing.T){
	checkBalance := func (t testing.TB,wallet Wallet, want Bitcoin)  {
		got := wallet.Balance()
		if got != want {
			t.Errorf("got %s want %s", got, want)
		}
	}	
	t.Run("deposite",func(t *testing.T) {
		wallet := Wallet{}
		wallet.Deposit(Bitcoin(10))
		want := Bitcoin(10)
			
		checkBalance(t,wallet, want);
	})
	
	
	t.Run("withdraw", func(t *testing.T) {
		wallet := Wallet{}
		wallet.Deposit(Bitcoin(28))
		wallet.Withdraw(Bitcoin(15))
		
		got:=  wallet.Balance()
		want:= Bitcoin(13)
		
		if got!= want {
			t.Errorf("got %s want %s",got, want)
		}

	})
}

