Copying all contents of one folder to another folder

```
cp -r /path/to/source/dir /path/to/destinition/dir
```

## GREP

Content of Hello.txt

```
hello world !
bangladesh is my country
Bangla is my language.
dhfajfdjhdfjahfdaf
dhfajfdjhdfjahfdaf
dhfajfdjhdfjahfdaf
dhfajfdjhdfjahfdaf
One of the greatest languages in the world : bangla
dhfajfdjhdfjahfdaf
dhfajfdjhdfjahfdaf
dhfajfdjhdfjahfdaf
dhfajfdjhdfjahfdaf
dhfajfdjhdfjahfdaf
Bangladeshi people are my friends
```

```
grep "Bangla" hello.txt
grep -w "Bangla" hello.txt   // matches as word
grep -iw "Bangla" hello.txt  // case insensitivity added
grep -niw "Bangla" hello.txt // line number added
grep -r "Bangla" .   // shows file names the word is in (recursively)
grep "Bangla" *  // check only files in the current directory
```

```
Write a shell command to list the files in current directory that
contains the word “fork” in the file content(as a whole word).
> grep -w "fork" ./*
```

```
Write a shell command to find the frequency of “bash” word(whole) in
input.txt (case insensitive).
> grep -w "fork" ./*
```
