<?php 
  include ("conn.php");  

  $articole = [];
  $cda = "SELECT product_id, productname, productprice, productimage, productOldPrice FROM product ORDER BY product_id ASC";
  if ($rez=mysqli_query($cnx,$cda)) {
    // Se preiau liniile pe rand
    while ($linie = mysqli_fetch_assoc($rez)) {
    $articole[] = $linie;
    }
  }

  /* Eliberez memoria ocupata de multimea de selectie */
  mysqli_free_result($rez);

  /* Inchid conexiunea cu serverul MySQL */
  mysqli_close($cnx);
  echo json_encode($articole);

/*function component($productname, $productprice, $productimage, $productOldPrice){
	$element='<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
					<form action="shopping.php" method="post">
						<div class="full product">
							<div class="product_img">
								<div class="center"> <img src="$productimage" alt="product1"/>
									<div class="overlay_hover"> <button type="submit" class="btn btn-warning" name="add">Adaugă în coș></button> </div>
								</div>
							</div>
							<div class="product_detail text_align_center">
								<p class="product_price">RON $productprice <span class="old_price">Ron $productOldPrice</span></p>
								<p class="product_descr">$productname </p>
							</div>
						</div>
					</form>
				</div>
	';
    echo $element;
}*/
?>