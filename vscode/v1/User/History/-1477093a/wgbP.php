<?php
include 'db.php';

try{
  $sql = "SELECT * FROM student_final"; 
  $result = mysqli_query($conn, $sql );
  echo $result;
  if($result){
    die("Query Failed: " . mysqli_error($conn));
    while($row = mysqli_fetch_assoc($result)){
      echo 'hello';
      $studentID = $row["StudentID"];
      echo $studentID;
    }
  }
}catch(Error){
  echo $Error;
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