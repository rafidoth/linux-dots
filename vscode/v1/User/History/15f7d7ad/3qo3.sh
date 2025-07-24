#!/bin/bash



a=$1
b=$2


echo $((expr $a) | (expr $b))


