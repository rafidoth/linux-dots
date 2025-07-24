package iterations

import "testing"


func TestRepeat(t *testing.T){
	rc := 10
	str := "a"
	repeated := Repeat(str, rc)
	expected := ""
	for i:=0; i<rc; i++ {
		expected+= str
	}
	
	
	if repeated != expected {
		t.Errorf("expected %q but got %q as repeated",expected, repeated)
	}
}

func BenchmarkRepeat(b *testing.B){
	for i:=0 ; i<b.N; i++ {
		Repeat("a",10)
	}
}