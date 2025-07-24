<?php
include 'db.php';

try {
    $sql = "SELECT * FROM student_final"; 
    $result = mysqli_query($conn, $sql); // This will throw if fails
    $students = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $students[] = (object) $row;
    }

} catch (mysqli_sql_exception $e) {
    echo "Query Error: " . $e>getMessage();
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
  <h1>hello world </h1>
    
</body>
</html>