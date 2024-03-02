<?php

session_start();
include("conn.php");
include("function.php");

$code=1;
$msg="获取id成功";
$data = array('id' => $_SESSION['id']);
echo $data["id"];
// echo getApiResult($code, $data["id"], $msg);
?>