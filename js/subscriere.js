document.querySelector("#adsubscrie").onclick = function (event) {  
   var formElement = document.querySelector(".newtetter"); 
   var formData = new FormData(formElement);

   var xhtp = new XMLHttpRequest();
   xhtp.open("POST", "subscriere.php");  //  
   
   xhtp.onload = function () {

   var raspunsobiect = JSON.parse(this.responseText);
     // console.log("raspunsobiect: " + raspunsobiect);
   var blocraspuns = document.querySelector("#rezsubscriere");

   var continutbloc = '<p>{email} Poate veți primi un e-mail semestrul viitor!</p>';
          
  continutbloc = continutbloc.replace('{email}', raspunsobiect.email);
  
   
   document.querySelector("#blocformular").style.display='none';
  
    blocraspuns.innerHTML = continutbloc;
   };


   // S-a produs o eroare
   xhtp.onerror = function () {
      alert('Ceva n-a mers!');
   };

   xhtp.send(formData);
};