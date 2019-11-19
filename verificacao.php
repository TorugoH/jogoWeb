<?php
  $bd=mysqli_connect('sql306.epizy.com','epiz_24805426','TzAXxlYaPUp','epiz_24805426_cadastros');

  $nick=$_GET["nome-usuario"];
  $senha=$_GET["nome-senha"];
  session_start();
  $_SESSION['name']=$nick;
  if(!$bd){
    echo "Falha na Conexão".mysqli_connect_error();
  }?>
  <?php
  $consulta="SELECT * from dados WHERE usuario='$nick' AND senha='$senha'";
  $resultadp=mysqli_query($bd,$consulta);
  $linha=mysqli_affected_rows($bd);
  if($linha>0){
    header('Location:index-jogo.html');
    ?>
  <?php }
  else{
    echo 'nao exite';
  }
?>
