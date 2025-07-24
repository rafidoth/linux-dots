package iterations

import "testing"


func RepeatTest(t *testing.T){
	repeated := Repeat("a")
	expected := "aaaaaa"
	
	
	if repeated != expected {
		t.Errorf("expected %q but got %q as repeated",expected, repeated)
	}
}