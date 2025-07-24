package maps

import "errors"




type Dictionary map[string]string


func (d Dictionary) Search(word string) (string, error){
	result , ok := d[word]
	if !ok {
		return "", errors.New("could not find the word you're looking for.")
	}


	return result
}