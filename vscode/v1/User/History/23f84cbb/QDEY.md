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
grep -w "Bangla" hello.txt
grep -iw "Bangla" hello.txt
grep -niw "Bangla" hello.txt
grep -r "Bangla" .
grep "Bangla" *

```
