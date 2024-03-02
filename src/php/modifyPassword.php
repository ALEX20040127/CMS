<?php
/**
 * 修改密码
*/

$code = 0;
$data = [];
$msg = ["密码错误", "两次输入的密码不一致", "修改密码成功"];

// 连接数据库  拼合时删除注释符，完善前缀文件名
include("conn.php");
include("function.php");
session_start();
$type = $_SESSION['identity'];
$user_id = $_SESSION['id'];
$old_pwd = $_POST['old_password'];
$new_pwd = $_POST['new_password'];
$con_pwd = $_POST['confirm_password'];



$table = ["student", "admin"];
$column = ["student_id", "admin_id"];

$sql = "select * from ".$table[$type]." where ".$column[$type]." = ? and password = ?";
$check_stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($check_stmt, "ss", $user_id, $old_pwd);
mysqli_stmt_execute($check_stmt);
mysqli_stmt_store_result($check_stmt);

if (mysqli_stmt_num_rows($check_stmt) > 0) {
    if ($con_pwd != $new_pwd) $code = 1;
    else {
        $update_sql = "update ".$table[$type]." set password = ? where ".$column[$type]." = ?";
        $update_stmt = mysqli_prepare($conn, $update_sql);
        mysqli_stmt_bind_param($update_stmt, "ss", $new_pwd, $user_id);
        if(mysqli_stmt_execute($update_stmt)){
            $code = 2;
            mysqli_stmt_close($update_stmt);
        }
    }
}
mysqli_stmt_close($check_stmt);

//关闭数据库连接
mysqli_close($conn);
echo getApiResult($code, $data, $msg);
?>