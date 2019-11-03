<?php
include_once('back-end.php');

$conectar=mysqli_connect('localhost','id7814689_bruna','harrypotter','id7814689_hp');// pegar no banco de dados
$email=$_GET["email"];
$nome=$_GET["nome-usuario"];
$senha=$_GET["nome-senha"];

$id=session_id();

if(!$conectar){
  echo("Conexão invalida!!");
}
echo '<div style ="color:black;
font-size:30px;
padding:20px;">Cadastro Feito!</div>';
echo '<a href="avatar.html" style="border-radius: 10px;
height:60px;
width:70px;
color:#FFFFFF;
background-color: #8B0000;
font-size: 20px;
text-align:center;
margin:auto;
padding:10px;">Entre</a>';

$sql_code = "INSERT INTO var(email,nome-usuario,nome-senha) VALUES ('$email','$nome','$senha')";
$sql_code=mysqli_query($conectar,$sql_code);
echo $id;

?>
