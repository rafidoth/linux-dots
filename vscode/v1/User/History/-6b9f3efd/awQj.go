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
		want:= Bitcoin(13)
		
		checkBalance(t,wallet, want)
	})
	
	t.Run("withdraw insufficient funds", func(t *testing.T) {
		startingBalance := Bitcoin(20)
		wallet  := Wallet{startingBalance}
		err:= wallet.Withdraw(Bitcoin(25))

		checkBalance(t,wallet, startingBalance)
		
		if err != nil {
			t.Error("Error Expected , But didn't get one")
		}  
	})
}

