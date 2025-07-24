#!/bin/bash




# echo "result `expr 1 + 2 - 4` "
#

# echo "Enter a number :"
# read number
#
#
# echo `expr $number + 5`
#
# if [ `expr $number + 1` -eq 0 ]; then
#   echo "Number is negative 1"
# elif [ `expr $number + 1` -eq 1 ]; then
#   echo "Number is zero"
# else
#   echo "Number is neither -1 nor 0"
# fi
#
#



echo "Enter numbers :"

sum=0

# for i in $*
#   do
#     sum=`expr $sum + $i`
#   done
#
# echo $sum


args=$*
for ((i=0;i<$#;i++))
  do 
    sum=`expr $sum + ${args[$i]}`
  done


echo $sum

