<?php
        
        $studentCount = $_POST["studentCount"]
        $eachStudentWant = $_POST["eachStudentWant"]
        $eachPizzaHas = $_POST["eachPizzaHas"]
        
        
        

        // calculate
        // minimum numnber of whole pizza
        // left over pizza slices
        // wasted money
        function minPizza($studentCount, $eachStudentWant, $eachPizzaHas){
            $minPizzasNeeded = ($studentCount * $eachStudentWant)/ $eachPizzaHas;
            echo "Minimum number of whole pizza: " . ceil($minPizzasNeeded) . "<br>";
        }

        minPizza(10,3,8)

?>
