package arrays

import "testing"


func TestSum(t *testing.T){
	t.Run("Fixed Array Sum of 5 Numbers", func(t *testing.T) {
		numbers := [5]int{1,2,3,4,5}
		got := Sum(numbers)
		want := 15
		
		
		if got != want {
			t.Errorf("got %d want %d, given %v", got,want,numbers)
		}
	})
}
