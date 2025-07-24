package iterations

import (
	"strings"
)

// func Repeat(str string) string{
// 	result :=""
// 	for i:=0; i<6; i++{
// 		result += str
// 	}
// 	return result
// }

const repeatCount = 6
func Repeat(str string) string{
	var result strings.Builder
	for i:=0; i<6; i++{
		result += str
	}
	return result
}


