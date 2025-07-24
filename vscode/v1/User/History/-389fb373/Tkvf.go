package arrays




func Sum(numbers []int) int{
	result := 0
	for _, num := range numbers {
		result += num
	}
	return result
}


func SumAll(slices ...[]int) []int {
	l := len(slices)	
	sums := make([]int,l)
	
	
	for i, nums := range l {
		sums[i] = Sum(nums)
	}
}