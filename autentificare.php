 <?php
 
   session_start();//se corecteaza faptul ca se poate accesa site-ul adaugare si din afara logarii 

   function corectez($sir) {
   $sir = trim($sir);
   $sir = stripslashes($sir);
   $sir = htmlspecialchars($sir);
   return $sir;
   }

   // preiau valorile din campurile formularului (numeletau, parolata)
   $nume = corectez($_POST["numeletau"]);
   $parola = corectez($_POST["parolata"]);
     
   $parolacriptata = md5($parola);
   
   include("conn.php");
  
   $cda = "SELECT nume, parola FROM admin WHERE nume = '$nume' and parola = '$parolacriptata'";

   $raspuns = [];
   $raspuns['nume'] = $nume;
      
   if ($rez=mysqli_query($cnx,$cda)) {
  $rowcount=mysqli_num_rows($rez);
    
  if ($rowcount != 0) {
      $raspuns['autentificat'] = 'da';
      $_SESSION['conectat'] = true;//daca utilizatorul este gasit in BD, declaram variabila de sesiune
      //valorile variabilei de sesiune sunt stocate in variabila globala $_SESSION
  } else {
     $raspuns['autentificat'] = 'nu';
      }
   }
     
   echo json_encode($raspuns);
?>
