document.querySelector("body").onload = function () {
  //script pentru combo-ul din formularul de adaugare articol, cu referire in adaugare.html
  /*Verificarea variabilei de sesiune: randuri 4-20*/
  var request = new XMLHttpRequest();
  request.open("POST", "conectat.php");  /*se face verificarea variabilei  de sesiune in fisierul categorii.js pt ca 
                              avem evenimentul ONLOAD. Daca fisierul conectat.php gaseste ==nu, =>directionare catre 
                              pagina de logare; daca gaseste ==da, se va incarca pagina cu formularul de adaugare*/
//  Am primit date
request.onload = function() {  
  if (this.responseText == "nu") {
    window.location.href = "login.html";
  }
};

// S-a produs o eroare
request.onerror = function () {
  alert('Hopa! Ceva n-a mers!');
};

request.send();

var xhtp = new XMLHttpRequest();
xhtp.open("GET", "categorii.php");
var lista = '<option value="0">(Alegeți categoria articolului)</option>'; 
/*lista va contine in final elementele <option>  
Construiesc prototipul unui element <option>*/
      var prototip = '<option value={id_categ}>{categoria}</option>';

        // S-au primit date de la scriptul de pe server
        xhtp.onload = function () {            
         var sirobiecte = JSON.parse(this.responseText);
           var combo = document.querySelector("#combo");  // elemente <select>
           sirobiecte.forEach(function(cat) {
            var rind = prototip.replace('{id_categ}', cat.id_categ);
            rind = rind.replace('{categoria}', cat.categoria);
        // console.log(cat.id_categ+" " + cat.categoria);
        lista += rind;
      });
           combo.innerHTML = lista;
         };

    // S-a produs o eroare
    xhtp.onerror = function () {
      alert('Hopa! Ceva n-a mers!');
    };

    xhtp.send();
  };