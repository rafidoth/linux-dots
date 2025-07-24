package maps

import "errors"


var ErrNotFound = errors.New("could not find the word you're looking for")

type Dictionary map[string]string


func (d Dictionary) Search(word string) (string, error){
	result , ok := d[word]
	if !ok {
		return "", ErrNotFound
	}
	return result, nil
}