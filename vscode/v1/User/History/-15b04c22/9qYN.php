<?php
$sname = "localhost";
$uname = "root";
$password = "";  
$dbname = "db";

// Attempt connection
$conn = mysqli_connect($sname, $uname, $password, $dbname);

// Check connection
if (!$conn) {
    die("MySQL Connection Error: " . mysqli_connect_error());
} else {
    echo "Database connected successfully!";
}
?>
