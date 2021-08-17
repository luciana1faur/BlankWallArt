//Script care efectueaza citirea din BD. Referire la citirea articolelor din BD Shopping din tabelul product. 
//conectat cu scriptul component.php
 document.querySelector("body").onload = function () {
   var xhtp = new XMLHttpRequest();
   xhtp.open("post", "component.php");

   // S-au primit date de la scriptul de pe server
   xhtp.onload = function () {
      var sirObj = JSON.parse(this.responseText);
      var i = 1;
      var continut = '';
      sirObj.forEach(function(item) {
         
            var model = '<div class="full product">'+
                     '<div class="product_img">'+
                        '<div class="center"> <img src="{productimage}" alt="product1"/>'+
                           '<div class="overlay_hover"> <button type="submit" class="btn btn-warning" name="add">Adaugă în coș></button> </div></div></div>'+
                     '<div class="product_detail text_align_center">'+
                        '<p class="product_price">RON {productprice} <span class="old_price">Ron {productOldPrice}</span></p>'+
                        '<p class="product_descr">{productname} </p>'+
                     '</div></div></form></div>';
       
      continut += model.replace('{productname}', item.productname).
                        replace('{productprice}', item.productprice).
                        replace('{productimage}', item.productimage).
                        replace('{productOldPrice}', item.productOldPrice).
                       
         i++;
      });
      document.querySelector('#afiseaza').innerHTML = continut;
         
   };

   // S-a produs o eroare
   xhtp.onerror = function () {
            alert('Hopa! Ceva n-a mers!');
   };

   xhtp.send();
};