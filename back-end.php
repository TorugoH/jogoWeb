 <?php
$conectar=mysqli_connect('localhost','root','','test');// pegar no banco de dados
$email=$_GET["email"];
$nome=$_GET["nome-usuario"];
$senha=$_GET["nome-senha"];
$id=session_id();
if(!$conectar){
  echo("Conexão invalida!!");
}
$consulta="SELECT * from cadastro WHERE email='$email' and usuario='$nome'";
$resultadp=mysqli_query($conectar,$consulta);
$linha=mysqli_affected_rows($conectar);
if($linha>0){
  echo 'usuario ja cadastrado';
  include('cadastrar.html');
}else{
$sql_code = "INSERT INTO cadastro(email,usuario,senha) VALUES ('$email','$nome','$senha')";
$sql_code=mysqli_query($conectar,$sql_code);
include('principal.html');
echo $id;
}
?>
