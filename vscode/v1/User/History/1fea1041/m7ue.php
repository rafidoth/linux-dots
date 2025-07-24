<?php
        function say($name){
            echo "hello $name";
        }
        say("rafi");

        // calculate
        // minimum numnber of whole pizza
        // left over pizza slices
        // wasted money
        function minPizza($studentCount, $eachStudentWant, $eachPizzaHas){
            $minPizzasNeeded = ($studentCount * $eachStudentWant)/ $eachPizzaHas;
            echo "Minimum number of whole pizza: " . ceil($minPizzasNeeded) . "<br>";
        }

        echo "$minPizza(10,3,8)"

?>
