#!/bin/bash




file="sum_input.txt"


if [ -f "$file" ]; then 
    echo "its a valid file, let's read this"
    line_number=0
    while IFS= read -r line; do 
        line_number=`expr $line_number + 1``
        echo "line "$line_number" :  $line"
    done < "$file"
else 
    echo "its not a valid file"
fi