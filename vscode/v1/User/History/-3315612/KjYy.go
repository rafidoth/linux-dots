package arrays

import (
	"slices"
	"testing"
)


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
		want:= []int{6,11,11}

		if !slices.Equal(got,want) {
			t.Errorf("got %v want %v", got, want)
		}
	})

	t.Run("Tail sum of given slices",func(t *testing.T) {
		got := TailSum([]int{1,2,3},[]int{6,5},[]int{2,4,5})
		want:= []int{5,5,9}

		if !slices.Equal(got,want) {
			t.Errorf("got %v want %v", got, want)
		}
	})

	t.Run("empty slice input returns zero",func(t *testing.T) {
		got := TailSum([]int{1,2,3},[]int{},[]int{2,4,5})
		want:= []int{5,0,9}

		if !slices.Equal(got,want) {
			t.Errorf("got %v want %v", got, want)
		}
	})
}
