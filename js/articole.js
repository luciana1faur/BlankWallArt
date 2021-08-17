window.onload = function() {
 
    var formData = new FormData(); 
    formData.append('categoria', 2); 

    var request = new XMLHttpRequest();
    request.open("POST", "articole.php");  
  
    //  Am primit date
    request.onload = function() {  
    var sirObj = JSON.parse(this.responseText);  //  Sir de obiecte
   
    //  O macheta pentru adaugarea unui obiect in bloc
   

    var macheta = '<div class="full product"><div class="product_img"><div class="center"> <img src="images/galerie/{imagine}" id="id_produs"/>'+
    '<div class="overlay_hover"> <a class="add-bt" href="product_detail3.html">+ Adaugă în coș</a> </div> </div>'+
    '</div><div class="product_detail text_align_center"><p class="product_price">RON {pret} '+
    '<span class="old_price">Ron {oldpret}</span></p><p class="product_descr">{descriere}</p></div></div></div>';
    continut = "";  //  Sir vid

    sirObj.forEach(function(item) {
      //  Inlocuiesc in macheta valorile primite si adaug rezultatul in "continut"

      continut += macheta.replace('{imagine}', item.imagine)            
                         .replace('{denumire}', item.denumire)
                         .replace('{descriere}', item.descriere)
                         .replace('{pret}', item.pret)
                         .replace('{oldpret}', item.oldpret)

            
    });
    document.querySelector("#afiseaza_articole").innerHTML = continut;  
  };
      
    // S-a produs o eroare
    request.onerror = function() {
        alert('Hopa! Ceva n-a mers!');
    };

    request.send(formData);
};