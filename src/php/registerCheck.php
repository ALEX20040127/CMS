<?php
/**
 * 注册
 */

// 初始化默认参数
$code = 0;
$data = [];
$msg = ["账号不能为空","密码不能为空","姓名不能为空","注册成功","用户已存在"];

//拼合时删除注释符，完善前缀文件名
include("conn.php");
include("function.php");
$identity = 1; //默认为管理员（保留项，18行注释符不要删掉）
$id = $_POST['id'];
$name = $_POST['name'];
$pwd = $_POST['pwd']; 
$identity = $_POST['identity'];  
$table = ["student", "admin"];
$id_colomn = ["student_id", "admin_id"];  
$name_colomn = ["student_name", "admin_name"];

// $id = "111";
// $name = "asdk";
// $pwd = "123";


if ($id == "") {
    $code = 0;
    echo getApiResult($code, $data, $msg);
    die(0);
}
if ($pwd == "") {
    $code = 1;
    echo getApiResult($code, $data, $msg);
    die(1);
}
if ($name == "") {
    $code = 2;
    echo getApiResult($code, $data, $msg);
    die(2);
}

// 查询数据库对应的表是否已经有该用户
$sql = "select * from ".$table[$identity]." where ".$id_colomn[$identity]." = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $id);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);

// 有重复则返回4
if (mysqli_stmt_num_rows($stmt) > 0) {
    $code = 4;
} else {
    //没有重复则导入信息成功注册

    $insert_stmt = mysqli_prepare($conn, "insert into ".$table[$identity]."(".$id_colomn[$identity].",".$name_colomn[$identity].", password) values (?, ?, ?)");
    mysqli_stmt_bind_param($insert_stmt, "sss", $id, $name, $pwd);
    $insert_result = mysqli_stmt_execute($insert_stmt);
    if ($insert_result) {
        $code = 3;
    }
    mysqli_stmt_close($insert_stmt);
}
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
    echo getApiResult($code, $data, $msg);
?>