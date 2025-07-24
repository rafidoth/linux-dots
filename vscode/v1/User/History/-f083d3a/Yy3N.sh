#!/bin/bash




file="sum_input.txt"

sum=0
if [ -f "$file" ]; then 
    echo "its a valid file, let's read this"
    line_number=0
    while IFS= read -r line; do 
        line_number=`expr $line_number + 1`
        read -r -a line_array <<< "$line"
        echo "line "$line_number" :  $line"
        sum=$`expr "{$line_array[0]}" + "$sum"`
    done < "$file"
else 
    echo "its not a valid file"
fi

echo "$sum"