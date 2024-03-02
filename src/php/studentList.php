<?php
/**
 * 提取学生列表
 */

 $code = 0;
 $data = [];
 $msg = ["生成失败", "生成成功"];

 // 连接数据库  拼合时删除注释符，完善前缀文件名
 include("conn.php");
 include("function.php");

 $cour_id = $_GET['course_id'];
 
// $cour_id = 1;
// 查询数据库提取该课程的学生信息
 if ($cour_id != "") {
    $sql = "select student_id, student_name, gender, grade, major,class from student where student_id in (select student_id from score where course_id = ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $cour_id);
    if (mysqli_stmt_execute($stmt)) {
        $code = 1;
        $rs = mysqli_stmt_get_result($stmt);
        while ($row = mysqli_fetch_assoc($rs)) {
            $data[] = $row;
        }
    }
    mysqli_stmt_close($stmt);
 }
 mysqli_close($conn);
 echo getApiResult($code, $data, $msg);
?>