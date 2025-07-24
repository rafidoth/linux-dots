package maps

import "errors"


var (
	ErrNotFound = errors.New("could not find the word you're looking for")
	ErrWordExists = errors.New("this word already exists, no overwrite happened")
	ErrWordDoesNotExist = errors.New("this word doesn't exist in the dictionary")
)

type Dictionary map[string]string


func (d Dictionary) Search(word string) (string, error){
	result , ok := d[word]
	if !ok {
		return "", ErrNotFound
	}
	return result, nil
}


func (d Dictionary) Add(w , def string) error{
	_, err := d.Search(w)

	switch err {
	case ErrNotFound:
		d[w] = def
	case nil :
		return ErrWordExists
	default:
		return err
	}
	return nil
}


func (d Dictionary) Update(w, newDef string) error{
	_, err := d.Search(w)

	switch err {
	case ErrNotFound:
		return ErrWordDoesNotExist
	case nil :
		d[w] = newDef
		return nil
	default :
		return err
	}
}


func (d Dictionary) Delete(w string) error{
	_, err := d.Search(w)

	switch err {
	case ErrNotFound:
		return ErrWordDoesNotExist
	case nil :
		delete(d,w)
		return nil
	default :
		return err
	}
}

