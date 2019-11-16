
<?php
#include "perfil.php";
  $bd=mysqli_connect('localhost','root','','test');
  session_start();
  $nome=$_SESSION['name'];
  if(!$bd){
    echo'erro'.mysqli_connect_error();
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="perfil.php">
    </head>
<body>
  <h1>perfil</h1>
  <p>NOME:<?php echo $_SESSION['name'];?></p>
  <?php
  $consulta="SELECT * from vitor WHERE usuario='$nome'";
  $resultadp=mysqli_query($bd,$consulta);
      foreach ($resultadp as $result){
        ?>
          <p>EMAIL<?php echo $result["email"];?></p>
        <?php }
      ?>
    </body>
</html>
