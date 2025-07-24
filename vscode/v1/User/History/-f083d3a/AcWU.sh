#!/bin/bash




file="sum_input.txt"


if [ -f "$file" ]; then 
    echo "its a valid file, let's read this"
else 
    echo "its not a valid file"
fi