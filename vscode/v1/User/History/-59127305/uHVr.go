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
		want := ErrNotFound

		if err == nil {
			t.Fatal("expected to get an error")
		}
		assertError(t,err, want)
	})
}


func TestAdd(t *testing.T){
	t.Run("new word", func(t *testing.T) {
		dictionary := Dictionary{}
		word := "test"
		def := "this is just a test"
		err := dictionary.Add(word, def)

		assertError(t, err, nil)
		assertDefinition(t, dictionary, word, def)
	})

	t.Run("existing word", func (t *testing.T)  {
		word := "test"
		def := "this is just a test"
		dictionary := Dictionary{ word : def}
		err := dictionary.Add(word, "new def")

		assertError(t, err, ErrWordExists)
		assertDefinition(t,dictionary, word, def)

	})
}



func TestUpdate(t *testing.T){
	w := "test"
	def := "this is a test"
	dic := Dictionary{w : def}
	newDef := "this is new test def"
}

func assertDefinition(t testing.TB, d Dictionary, word, def string){
	t.Helper()
	got, err := d.Search(word)
	if err != nil {
		t.Fatal("should find added word", err)
	}
	assertStrings(t,got, def)
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