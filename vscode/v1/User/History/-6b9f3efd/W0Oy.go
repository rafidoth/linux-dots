package pointerserrors

import (
	"testing"
)


func TestWallet(t *testing.T){
	t.Run("deposite",func(t *testing.T) {
		wallet := Wallet{}
		wallet.Deposit(Bitcoin(10))
		want := Bitcoin(10)
			
		checkBalance(t,wallet, want);
	})
	
	
	t.Run("withdraw", func(t *testing.T) {
		wallet := Wallet{}
		wallet.Deposit(Bitcoin(28))
		err:= wallet.Withdraw(Bitcoin(15))
		want:= Bitcoin(13)
		checkNoError(t,err)	
		checkBalance(t,wallet, want)
	})
	
	t.Run("withdraw insufficient funds", func(t *testing.T) {
		startingBalance := Bitcoin(20)
		wallet  := Wallet{startingBalance}
		err:= wallet.Withdraw(Bitcoin(25))
		checkError(t, err,"insufficient balance bhai" )
		checkBalance(t,wallet, startingBalance)
		
	})
}

	 func checkBalance(t testing.TB,wallet Wallet, want Bitcoin)  {
		t.Helper()
		got := wallet.Balance()
		if got != want {
			t.Errorf("got %s want %s", got, want)
		}
	}	
	

	func  checkError(t testing.TB, got error , want string)  {
		t.Helper()
		if got == nil {
			t.Fatal("expected one but didn't get")
		}
		
		if got.Error() != want {
			t.Errorf("got %q, want %q", got , want)
		}
	}
	
	
	func checkNoError(t testing.TB, got error){
		t.Helper()
		
		if got != nil{
			t.Fatal("didn't expect an error but got one")
		}
	}
