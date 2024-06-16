#!/bin/bash

# Echo the current working directory
current_dir=$(pwd)
#echo "Current directory: $current_dir"

# Get the source file path
src="$1"
src_file_path="$current_dir/$src"
run_file_path="$current_dir/a"

# Debugging: Print out the file paths
#echo "Source file path: $src_file_path"
#echo "Run file path: $run_file_path"

# Check if the source file exists
if [ ! -f "$src_file_path" ]; then
    echo "Error: Source file not found."
    exit 1
fi

# Compile the program
g++ -std=c++17 -Wshadow -Wall -o "$run_file_path" "$src_file_path" -g -fsanitize=undefined -D_GLIBCXX_DEBUG

# Check if compilation was successful
if [ $? -ne 0 ]; then
    echo "Error: Compilation failed."
    exit 1
fi

# Execute the program
"$run_file_path"
