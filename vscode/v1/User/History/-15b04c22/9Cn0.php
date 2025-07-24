<?php
    $sname = "localhost";
    $uname = "root";
    $passowrd = "";
    $dbname = "crud";
    $conn = mysqli_connect($sname, $uname, $passowrd, $dbname);
    if(!$conn){
        echo 'mysql connection error.';
        mysqli_error($conn);
    }
?>