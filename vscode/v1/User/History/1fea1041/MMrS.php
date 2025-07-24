<?php
        
        $studentCount = $_POST["studentCount"];
        $eachStudentWant = $_POST["eachStudentWant"];
        $eachPizzaHas = $_POST["eachPizzaHas"];

        // calculate
        // minimum numnber of whole pizza
        // left over pizza slices
        // wasted money
        function minPizza($studentCount, $eachStudentWant, $eachPizzaHas){
            $minPizzasNeeded = ceil(($studentCount * $eachStudentWant)/ $eachPizzaHas);
            echo "Minimum number of whole pizza: " . $minPizzasNeeded . "<br>";
            $leftOver = ($minPizzasNeeded * $eachPizzaHas) - ($eachStudentWant * $studentCount);
            echo "Left over pizza slices: " . $leftOver . "<br>";

        }

        minPizza($studentCount, $eachStudentWant, $eachPizzaHas)

?>
