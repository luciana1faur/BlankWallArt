document.querySelector("#logare").onclick = function (event) {
 var formElement = document.querySelector("#formularlogare"); 
  var formData = new FormData(formElement);
  var xhtp = new XMLHttpRequest();
  xhtp.open("POST", "autentificare.php");  // va deveni autentificare.php
 
   xhtp.onload = function () {
   var raspunsobiect = JSON.parse(this.responseText);
   var blocraspuns = document.querySelector("#afiseaza");
   
    if(raspunsobiect.autentificat == "da") {
       var continutbloc = '<p class="text_align_center">Sunteți logat în cadrul site-ului BlankWallArt cu numele:  <strong>{nume}</strong><br>Acțiuni posibile în baza de date</p><div class="row justify-content-md-center"><span class="actiuni"><a href="adaugare.html">adaugă articole</a><a href="sterge.html">șterge articole</a><a href="deconectat.php">delogare</a></span></div>';  
    }
     else {
       var continutbloc = '<p class="text_align_center"><strong>{nume}</strong><br> NU aveți acces la baza de date</p>';
    }
    continutbloc = continutbloc.replace('{nume}', raspunsobiect.nume);
    document.querySelector("#blocform").style.display='none';
    //afisez raspunsul
    blocraspuns.innerHTML=continutbloc;
     console.log("testez: " + continutbloc);
  };

 
  xhtp.onerror = function () {
    alert('Hopa! Ceva n-a mers!');
  };

  xhtp.send(formData);
  ;
};