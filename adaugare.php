<?php
    /*Script adaugare.php este script in adaugare.html si adaugare.js.
    Scriptul pentru butonul ADAUGA dupa formularul de Adauga articole in BD adaugare.html*/
   function corectez($sir)
  {
   $sir = trim($sir);
   $sir = stripslashes($sir);
   $sir = htmlspecialchars($sir);
   return $sir;
  }
  //print_r($_POST);
  
  if (corectez($_FILES["fisier"]["error"]) > 0) {
      echo "Error: " . $_FILES["fisier"]["error"] . "
"; 
      exit; 
   }
  
   $numeimagine = corectez($_FILES["fisier"]["name"]); 
   $poz = strrpos($numeimagine, "."); 
   $extensie = substr ($numeimagine, $poz); 
   $nmtmp = $_FILES["fisier"]["tmp_name"]; 
   
   
   
    $img = 'a.png'; // Pentru poze initial folosesc un nume generic (a.png)
   $categoria = corectez($_POST["combo"]); 
   $nume = corectez($_POST["nume"]); 
   $pretul = corectez($_POST["pret"]);
   $descriere = corectez($_POST["descriere"]);
   $pretulVechi = corectez($_POST["oldpret"]);
   
   include("conn.php");
 
   $raspuns = [];
   $cda = "INSERT INTO produse (id_categ, denumire, imagine, descriere, pret, oldpret) VALUES (?, ?, ?, ?, ?, ? )"; //cheia primara e un camp de tip autoincrement
   $stmt = mysqli_prepare($cnx, $cda);
   mysqli_stmt_bind_param($stmt, 'isssdd', $categoria, $nume, $img, $descriere, $pretul, $pretulVechi);
   mysqli_stmt_execute($stmt);
        
   $id = mysqli_insert_id($cnx);  //  ID-ul ultimului articol introdus
   // Generez un nume dependent de id si transfer fisierul cu imaginea in directorul "galerie"
   $numenou = 'img' . (string)$id.strtolower($extensie);
  
   //  Inlocuiesc numele implicit cu cel real
   $cdaa = "UPDATE produse SET imagine = '" . $numenou . "'  WHERE id_produs = $id";
   mysqli_query($cnx, $cdaa);
   //  Mut fisierele din directorul temporar
   $cale = 'images/galerie/'.$numenou;
   $rezultat = move_uploaded_file($nmtmp, $cale);
    
    $raspuns['mesaj'] ='da';
    $raspuns['nume'] = $nume;
    
    if (!$rezultat)
    {
      die('Eroare la incarcarea fisierului.');
      $raspuns['mesaj'] ='nu';
        $raspuns['nume'] = $nume;
    }
    
    
  
    //  Inchid $stmt si $cnx
    mysqli_stmt_close($stmt);
    mysqli_close($cnx);
      
    
    echo json_encode($raspuns);
   ?>