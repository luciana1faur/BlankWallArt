<?php
   function corectez($sir) {
   $sir = trim($sir);
   $sir = stripslashes($sir);
   $sir = htmlspecialchars($sir);
   return $sir;
   }

   // preiau valorile din campurile formularului (email, si din sistem data la care s-a completat formularul)
   
   $email = corectez($_POST["email"]);
   
   
   include("conn.php");
 
  $cda = "INSERT INTO subscrieri (email) VALUES (?)";
  $stmt = mysqli_prepare($cnx, $cda);
   mysqli_stmt_bind_param($stmt, 's', $email);
   mysqli_stmt_execute($stmt) or die (mysqli_error($cnx));
   
   mysqli_stmt_close($stmt);
   mysqli_close($cnx);
   $raspuns = [];
   $raspuns['email'] = $email;
   echo json_encode($raspuns);    
?>