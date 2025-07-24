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
dhfajfdjhdfjahfdaf
dhfajfdjhdfjahfdaf
dhfajfdjhdfjahfdaf
dhfajfdjhdfjahfdaf
dhfajfdjhdfjahfdaf
Bangladeshi people are my friends
```

Command

```
grep "Bangla" hello.txt
```

Output

```
Bangla is my language.
Bangladeshi people are my friends
```

Command

I want

```
grep -w "Bangla" hello.txt
```

Output

```
Bangla is my language.
```
