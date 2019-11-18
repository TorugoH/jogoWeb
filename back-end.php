 <?php
$conectar=mysqli_connect('localhost','root','','test');// pegar no banco de dados
$email=$_GET["email"];
$nome=$_GET["nome-usuario"];
$senha=$_GET["nome-senha"];
$id=session_id();
if(!$conectar){
  echo("Conexão invalida!!");
}
/*verifica se a usuario cadastrado*/
$consulta="SELECT * from vitor WHERE email='$email' and usuario='$nome'";
$resultadp=mysqli_query($conectar,$consulta);
$linha=mysqli_affected_rows($conectar);
if($linha>0){
  echo 'usuario ja cadastrado';
  header('location:cadastrar.html');
}else{
  /*se não tiver ele cadastra*/
$sql_code = "INSERT INTO vitor(email,usuario,senha) VALUES ('$email','$nome','$senha')";
$sql_code=mysqli_query($conectar,$sql_code);
header('location:index-jogo.html');
echo $id;
}
?>
