<?php
include 'db.php';

// if (isset($_POST['submit'])) {
//     $pname = $_POST['product'];
//     $cname = $_POST['company'];
//     $price = $_POST['price'];
//     $quantity = $_POST['quantity'];
//     $date = $_POST['date'];

//     // Double-check column names match the table definition
//     $sql = "INSERT INTO products (cname, company, price, quantity, addDate)
//             VALUES ('$pname', '$cname', '$price', '$quantity', '$date')";

//     $result = mysqli_query($conn, $sql);

//     if ($result) {
//         header('Location: display.php');
//         exit;
//     } else {
//         echo "❌ Error: " . mysqli_error($conn);
//     }
// }
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
<form method="post">
  <div class="form-group">
    <label>Product Name</label>
    <input type="text" name="product" >
  </div>

  <div class="form-group">
    <label>Product Company</label>
    <input type="text" name="company" >
  </div>
  <div class="form-group">
    <label>Product Price</label>
    <input type="number" name="price" >
  </div>
  <div class="form-group">
    <label>Product Quantity</label>
    <input type="number" name="quantity" >
  </div>

  <div class="form-group" >
    <label>Date</label>
    <input type="date" name="date" >
  </div>
  <input type="submit" name="submit" class="btn btn-primary" value="Submit">
</form>
    
</body>
</html>