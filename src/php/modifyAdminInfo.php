<?php
/**
 * 修改管理员个人信息
*/

$code = 0;
$data = [];
$msg = ["修改个人信息失败", "修改个人信息成功"];

// 连接数据库  拼合时删除注释符，完善前缀文件名
include("conn.php");
include("function.php");

session_start();
$adm_id = $_SESSION['id'];
$mail = $_POST['mail'];
$phone = $_POST['phone'];

$sql = "update admin set mail = ?, phone = ? where admin_id = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "sss", $mail, $phone, $adm_id);
if (mysqli_stmt_execute($stmt)) {
    $code = 1;
    mysqli_stmt_close($stmt);
}

//关闭数据库连接
mysqli_close($conn);
echo getApiResult($code, $data, $msg);
?>