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
	
	
	for i, nums := range slices {
		sums[i] = Sum(nums)
	}
	return sums
}


func TailSum(slices ...[]int) []int{
	var sums []int
	for _, nums :=range slices {
		if len(nums) < 1 {
			sums = append(sums, 0)
		}else{
			sums = append(sums, Sum(nums[1:]) )
		}
	}
	return sums
}