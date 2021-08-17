 <?php
    session_start();
  //functia isset verifica daca o variabila este declarata. 
    //Are ca parametri variabila care trebuie verificata (in cazul nostru variabila de sesiune)
    //si valoarea de retur (==true)
    if (isset($_SESSION['conectat']) && $_SESSION['conectat'] == true)
      echo "da";
   else
     echo "nu";
?>
  