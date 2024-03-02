<?php
/**
 * 获取个人信息
*/

$code = 0;
$data = [];
$msg = ["获取个人信息失败", "获取个人信息成功"];

// 连接数据库  拼合时删除注释符，完善前缀文件名
include("conn.php");
include("function.php");

$table = ["student", "admin"];
$column = ["student_id", "admin_id"];
session_start();
$usr_id = $_SESSION['id'];
$type = $_SESSION['identity'];
//测试数据
// $usr_id = '1001';
// $type = 1;


$sql = "select * from ".$table[$type]." where ".$column[$type]." = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $usr_id);
if (mysqli_stmt_execute($stmt)) {
    $code = 1;
    $rs = mysqli_stmt_get_result($stmt);
    while($row = mysqli_fetch_assoc($rs)) {
        $data[] = $row;
        
    }
}
mysqli_stmt_close($stmt);

mysqli_close($conn);
echo getApiResult($code, $data, $msg);
?>