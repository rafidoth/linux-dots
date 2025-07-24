package maps

import "errors"


var ErrNotFound = errors.New("could not find the word you're looking for")
var ErrWordExists = errors.New("this word already exists, no overwrite happened")

type Dictionary map[string]string


func (d Dictionary) Search(word string) (string, error){
	result , ok := d[word]
	if !ok {
		return "", ErrNotFound
	}
	return result, nil
}


func (d Dictionary) Add(w , def string) error{
	_ , ok := d[w]
	if ok {
		return ErrWordExists
	}
	d[w] = def
	return nil
}