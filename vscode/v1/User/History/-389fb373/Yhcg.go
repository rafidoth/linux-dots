package arrays




func Sum(numbers [5]int) int{
	result := 0
	for _, num := range numbers {
		result += num
	}
	return result
}