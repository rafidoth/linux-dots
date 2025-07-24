package arrays

import "testing"


func TestSum(t *testing.T){
	t.Run("Slices of any size", func(t *testing.T) {
		numbers := []int{1,2,3,4,5}
		got := Sum(numbers)
		want := 15
		
		if got != want {
			t.Errorf("got %d want %d, given %v", got,want,numbers)
		}
	})
	
	
	t.Run("Taking Variable Number of Slices in argument",func(t *testing.T) {
		got := SumAll([]int{1,2,3},[]int{6,5},[]int{2,4,5})
	})
}
