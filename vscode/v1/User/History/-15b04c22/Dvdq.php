<?php
    $sname = "localhost";
    $uname = "root";
    $passoword = "";
    $dbname = "db";
    $conn = mysqli_connect($sname, $uname, $passowrd, $dbname);
    if(!$conn){
        echo 'mysql connection error.';
        mysqli_error($conn);
        echo $conn;
    }
?>