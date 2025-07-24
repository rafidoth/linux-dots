package maps

import "testing"

func TestSearch(t *testing.T){
	dictionary := Dictionary{"test": "this is just a test"}
	
	t.Run("Known Word", func(t *testing.T){
	got := dictionary.Search("test")
	want := "this is just a test"
	})
	

	assertStrings(t, got, want)
}

func assertStrings(t testing.TB, got, want string) {
	t.Helper()

	if got != want {
		t.Errorf("got %q want %q", got, want)
	}
}