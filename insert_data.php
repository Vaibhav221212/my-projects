


<?php

$input=file_get_contents('php://input');
$decode=json_decode($input,true);


$name=$decode["name"];


$server='localhost';
$user='root';
$pass='vaibhav@2212';
$dataBase='userInfo';
$conn= mysqli_connect($server,$user,$pass,$dataBase);

$let=false;

if($name=="login")
{
  $username=$decode["username"];
  $pass=$decode["password"];
 
  $sql="select userName,password from user where userName='$username' and password='$pass'";
  $result=mysqli_query($conn,$sql);
  $num= mysqli_num_rows($result);
  if($num>0)
  {
     $let=true;
   
  }

}

else
{
  $username=$decode["username"];
  $email=$decode["email"];
  $pass=$decode["password"];
  $sql="INSERT INTO user(userName,email,password) VALUES ('{$username}','{$email}','{$pass}')";
  mysqli_query($conn,$sql);

}

 
?>