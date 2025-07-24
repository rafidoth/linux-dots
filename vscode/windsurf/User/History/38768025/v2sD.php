<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP WEB 1</title>
</head>
<body>
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
            
        }

    ?>
</body>
</html>