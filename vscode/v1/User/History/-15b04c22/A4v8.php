<?php
    $sname = "localhost";
    $uname = "root";
    $passowrd = "asda";
    $dbname = "db";
    $conn = mysqli_connect($sname, $uname, $passowrd, $dbname);
    if(!$conn){
        echo 'mysql connection error.';
        mysqli_error($conn);
    }
?>