package maps

import "testing"

func TestSearch(t *testing.T){
	dictionary := Dictionary{"test": "this is just a test"}
	
	t.Run("Known Word", func(t *testing.T){
		got , _ := dictionary.Search("test")
		want := "this is just a test"

		assertStrings(t, got, want)
	})
	
	t.Run("Unknown Word", func(t *testing.T){
		_, err := dictionary.Search("unknown")
		want := "could not find the word you're looking for"

		if err == nil {
			t.Fatal("expected to get an error")
		}
		assertStrings(t, err.Error(), want)
	})
}


func assertError(t testing.TB, got,want error){
	t.Helper()
	if got != want {
			t.Errorf("got error %q want %q", got, want)
		}
}

func assertStrings(t testing.TB, got, want string) {
	t.Helper()

	if got != want {
		t.Errorf("got %q want %q", got, want)
	}
}