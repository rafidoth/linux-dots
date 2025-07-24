#!/bin/bash


# arithmetic operations
a=$1
b=$2

v1=$((a + b))
v2=$((a - b))
v3=$((a * b))
v4=$((a / b))


k1=$(expr $a + $b)
k2=$(expr $a - $b)
k3=$(expr $a \* $b)
k4=$(expr $a / $b)


echo "Addition: $k1"
echo "Subtraction: $k2"
echo "Multiplication: $k3"
echo "Division: $k4"

echo "------------------"

echo "Addition: $v1"
echo "Subtraction: $v2"
echo "Multiplication: $v3"
echo "Division: $v4"



