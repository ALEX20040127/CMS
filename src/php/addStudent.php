<?php
/**
 * 导入学生信息
 * //补充sc表的信息,增加课程号
*/

$code = 0;
$data = [];
$msg = ["该学生已存在", "导入成功","学号需要为数字"];

// 连接数据库  拼合时删除注释符，完善前缀文件名
include("conn.php");
include("function.php");


 $stu_id = $_POST['student_id'];
 $cour_id = $_POST['course_id'];
 $name = $_POST['student_name'];
 $gender = $_POST['gender'];
 $grade = $_POST['grade'];
 $major = $_POST['major'];
 $class = $_POST['class'];

 
 for ($i = 0; $i < strlen($stu_id); $i++) {
    // 如果有一个字符不是数字，则返回false
    if (!ctype_digit($stu_id[$i])) {
        $code = 2;
        break;
    }
}
if ($code == 2) {
    mysqli_close($conn);
    echo getApiResult($code, $data, $msg);
    die(0);
}


// 检查是否存在该学生
$sql_check = "select * from student where student_id = ?";
$check_stmt = mysqli_prepare($conn, $sql_check);
mysqli_stmt_bind_param($check_stmt, "s", $stu_id);
mysqli_stmt_execute($check_stmt);
mysqli_stmt_store_result($check_stmt);
if (mysqli_stmt_num_rows($check_stmt) == 0) {
    //导入student表信息
    $add_sql = "insert into student(student_id, student_name, gender, grade, major, class) values (?, ?, ?, ?, ?, ?)";
    $add_stmt = mysqli_prepare($conn, $add_sql);
    mysqli_stmt_bind_param($add_stmt, "sssdss", $stu_id, $name, $gender, $grade, $major, $class);
    if (mysqli_stmt_execute($add_stmt)) $code=1;
    mysqli_stmt_close($add_stmt);
    //导入score表信息
    $add_sc_sql = "insert into score(student_id, course_id) values (?, ?)";
    $sc_stmt = mysqli_prepare($conn, $add_sc_sql);
    mysqli_stmt_bind_param($sc_stmt, "si", $stu_id, $cour_id);
    mysqli_stmt_execute($sc_stmt);
    mysqli_stmt_close($sc_stmt);
}


mysqli_close($conn);
echo getApiResult($code, $data, $msg);
?>
