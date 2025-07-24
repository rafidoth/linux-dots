package pointerserrors

import (
	"testing"
)

func TestWallet(t *testing.T){
	checkBalance := func (t testing.TB,wallet Wallet, want Bitcoin)  {
		t.Helper()
		got := wallet.Balance()
		if got != want {
			t.Errorf("got %s want %s", got, want)
		}
	}	
	
	
	checkError := func (t testing.TB, got error , want string)  {
		t.Helper()
		if got == nil {
			t.Fatal("expected one but didn't get")
		}
		
		if got.Error() != want {
			t.Errorf("got %q, want %q", got , want)
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

