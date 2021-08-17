 //Script adaugare.js este script in adaugare.html cu referinta la adaugare.php. Se refera la formularul de adaugare in BD.
 //butonul adauga
 document.querySelector("#adauga").onclick = function (event) {
       
        var formElement = document.querySelector("#colecteaza");
        var formData = new FormData(formElement);
        var xhtp = new XMLHttpRequest();
        xhtp.open("POST", "adaugare.php");  //  Va deveni adaugare.php

        // S-au primit date de la scriptul de pe server
        xhtp.onload = function () {
            var raspunsobiect = JSON.parse(this.responseText);
    var blocraspuns = document.querySelector("#afiseaza");
    if (raspunsobiect.mesaj === "da") {
      var continutbloc = '<p>Produsul <strong>{nume} </strong>s-a adaugat în baza de date.<br><br>Puteți adăuga încă un <a href="adaugare.html"><strong>produs</strong></a> sau vă puteți <a href="index.html"><strong>deconecta</strong></a></p>';
    } else {
      var continutbloc = '<p>Produsul <strong>{nume} </strong> NU s-a adăugat în baza de date.<br><br>Puteți adăuga încă un <a href="adaugare.html">produs</a> sau vă puteți <a href="index.html">deconecta</a></p>';
  }
    
    continutbloc = continutbloc.replace('{nume}', raspunsobiect.nume);
    document.querySelector("#blocform").style.display='none';
    blocraspuns.innerHTML = continutbloc;
        };

        // S-a produs o eroare
        xhtp.onerror = function () {
            alert('Hopa! Ceva n-a mers!');
        };

        xhtp.send(formData);
    };