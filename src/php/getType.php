<?php

session_start();
include("conn.php");
include("function.php");

$code=1;
$msg="获取type成功";
$data = array('identity' => $_SESSION['identity']);
echo $data["identity"];
// echo getApiResult($code, $data["id"], $msg);
?>