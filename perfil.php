
<?php
#include "perfil.php";
  $bd=mysqli_connect('sql306.epizy.com','epiz_24805426','TzAXxlYaPUp','epiz_24805426_cadastros');
  session_start();
  $nome=$_SESSION['name'];
  if(!$bd){
    echo'erro'.mysqli_connect_error();
  }
?>
<!DOCTYPE html>
<html>
  <head>
      <title>Perfil</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="perfil.php">
   <link href="perfil.css" rel="stylesheet">
   <link rel="icon" type="imagem/png" href="imgs/icone.png">
    </head>
<body>
<div id="perfil">
<h1><img src="https://fontmeme.com/permalink/191117/0b9dbc243eb780cdd7dd994c0fc8b5f9.png" alt="super-mario-font"></h1>
  <p><img src="https://fontmeme.com/permalink/191117/c8d9c1893d8dd211ababa60bb9c3b3e9.png" alt="super-mario-font"> <?php echo $_SESSION['name'];?></p>
  <?php
  $consulta="SELECT * from vitor WHERE usuario='$nome'";
  $resultadp=mysqli_query($bd,$consulta);
      foreach ($resultadp as $result){
        ?>
          <p><img src="https://fontmeme.com/permalink/191117/11e9e93267f7031ec3b2f09a0d535827.png" alt="super-mario-font"> <?php echo $result["email"];?></p>
        <?php }
      ?>
      </div>
    </body>
</html>
