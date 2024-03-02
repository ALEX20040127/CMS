<?php
/**
 * 登录
 */
//打开会话
session_start();

$code = 0;
$data = [];
$msg = ["用户名或密码错误","登录成功"];
//拼合时删除注释符，完善前缀文件名
include("conn.php");
include("function.php");

$identity = 1; //默认为管理员
$userid = $_POST['userid'];
$password = $_POST['password'];
$identity = $_POST['identity']; 
$table = ["student", "admin"];
$id_colomn = ["student_id", "admin_id"];

//测试数据
// $userid = 111;
// $password = 123;
// $identity = 1; 

if ($userid == '' || $password == '') {}
else {
    //查询数据库是否有匹配的账号密码
    $sql = "select * from ".$table[$identity]." where ".$id_colomn[$identity]." = ? and password = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $userid, $password);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    if (mysqli_stmt_num_rows($stmt) > 0) {
        $code = 1;
        $_SESSION['id'] = $userid;
        $_SESSION['identity'] = $identity;
    }
    mysqli_stmt_close($stmt);
}
mysqli_close($conn);
echo getApiResult($code, $data, $msg);

?>