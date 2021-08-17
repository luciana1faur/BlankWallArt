 <?php
   function corectez($sir) {
   $sir = trim($sir);
   $sir = stripslashes($sir);
   $sir = htmlspecialchars($sir);
   return $sir;
   }

   // preiau valorile din campurile formularului (nume, email, telefon, recenzie  si din sistem data la care s-a completat formularul)
   $nume = corectez($_POST["nume"]);
   $email = corectez($_POST["email"]);
   $telefon = corectez($_POST["telefon"]);
   $recenzie = corectez($_POST["mesaj"]);
   $dataup = date("Y-m-d"); // formatul “cerut” de mysql este an-luna-zi
   
   include("conn.php");
 
  $cda = "INSERT INTO recenzii (nume, email, telefon, recenzie, data_upload)VALUES (?, ?, ?, ?, ?)";
  $stmt = mysqli_prepare($cnx, $cda);
   mysqli_stmt_bind_param($stmt, 'sssss', $nume, $email, $telefon, $recenzie, $dataup);
   mysqli_stmt_execute($stmt) or die (mysqli_error($cnx));
   
   mysqli_stmt_close($stmt);
   mysqli_close($cnx);
   $raspuns = [];
   $raspuns['nume'] = $nume;
   echo json_encode($raspuns);    
?>