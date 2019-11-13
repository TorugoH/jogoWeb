<?php
  $bd=mysqli_connect('localhost','root','','test');
  $nick=$_GET["nome-usuario"];
  $senha=$_GET["nome-senha"];
  if(!$bd){
    echo "Falha na Conexão".mysqli_connect_error();
  }
  $consulta="SELECT * from cadastro WHERE usuario='$nick' AND senha='$senha'";
  $resultadp=mysqli_query($bd,$consulta);
  $linha=mysqli_affected_rows($bd);
  if($linha>0){
    echo 'ok';
    include('principal.html');
  }
  else{
    echo 'nao exite';
  }
?>
