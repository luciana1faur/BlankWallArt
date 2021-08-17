//Script care efectueaza citirea din BD. Reerire la citirea recenziilor sub forma de tabel. 
//conectat cu scriptul citeste.php
 document.querySelector("body").onload = function () {
   var xhtp = new XMLHttpRequest();
   xhtp.open("GET", "citeste.php");

   // S-au primit date de la scriptul de pe server
   xhtp.onload = function () {
      var sirObj = JSON.parse(this.responseText);
      var i = 1;
      var continut = '';
      sirObj.forEach(function(item) {
         
            var model = ' <tr> <td>{nr} </td> <td>{nume} </td> <td>{email} </td> <td>{telefon} </td> <td>{recenzie} </td> </tr>';
       
      continut += model.replace('{nr}', i).
                        replace('{nume}', item.nume).
                        replace('{email}', item.email).
                        replace('{telefon}', item.telefon).
                        replace('{recenzie}', item.recenzie);
         i++;
      });
      document.querySelector('#citeste').innerHTML = continut;
         
   };

   // S-a produs o eroare
   xhtp.onerror = function () {
            alert('Hopa! Ceva n-a mers!');
   };

   xhtp.send();
};