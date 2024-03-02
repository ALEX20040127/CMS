<?php
/**
 * 
 */
$code = 0;
$data = [];
$msg = ["添加课程失败", "添加课程成功"];

// 连接数据库  拼合时删除注释符，完善前缀文件名
include("conn.php");
include("function.php");

//获取课程信息
session_start();
$cour_name = $_POST['course_name'];
$tea_id = $_SESSION['id'];
$credit = $_POST['credit'];
$disc = $_POST['course_describe'];
// $fileName = $_FILES['file']['name'];
//头像处理
//$fileContent = addslashes(file_get_contents($_FILES['file']['tmp_name']));

$sql = "insert into course(course_name, teacher_id, credit, course_describe) values (?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ssds", $cour_name, $tea_id, $credit, $disc);
if (mysqli_stmt_execute($stmt)) {
    $code = 1;
    mysqli_stmt_close($stmt);
}

mysqli_close($conn);
echo getApiResult($code, $data, $msg);
?>