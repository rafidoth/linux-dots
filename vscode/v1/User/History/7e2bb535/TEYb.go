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

func Repeat(str string, repeatCount int) string{
	var result strings.Builder
	for i:=0; i<repeatCount; i++{
		result.WriteString(str)
	}
	return result.String()
}


