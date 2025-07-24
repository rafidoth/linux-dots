package arrays




func Sum(numbers [5]int) int{
	result := 0
	for i:=0; i<5; i++ {
		result+= numbers[i]
	}
	return result
}