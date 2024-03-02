<?php
/**
 * 修改个人信息
*/

$code = 0;
$data = [];
$msg = ["修改个人信息失败", "修改个人信息成功"];

// 连接数据库  拼合时删除注释符，完善前缀文件名
include("conn.php");
include("function.php");

session_start();

$stu_id= $_POST['id'];

if($stu_id==""){
    $stu_id = $_SESSION['id'];
    $mail = $_POST['mail'];
    $phone = $_POST['phone'];
    $class = $_POST['class'];
    $gender = $_POST['gender'];
    $grade = $_POST['grade'];
    $major = $_POST['major'];

    $sql = "update student set mail = ?, phone = ?, class = ?, gender = ?, grade = ?, major = ? where student_id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sssssss", $mail, $phone, $class, $gender, $grade, $major, $stu_id);
    if (mysqli_stmt_execute($stmt)) {
        $code = 1;
        mysqli_stmt_close($stmt);
    }
}
else{
    $class = $_POST['class'];
    $gender = $_POST['gender'];
    $grade = $_POST['grade'];
    $major = $_POST['major'];

    $sql = "update student set class = ?, gender = ?, grade = ?, major = ? where student_id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sssss", $class, $gender, $grade, $major, $stu_id);
    if (mysqli_stmt_execute($stmt)) {
        $code = 1;
        mysqli_stmt_close($stmt);
    }
}
//关闭数据库连接
mysqli_close($conn);
echo getApiResult($code, $data, $msg);
?>