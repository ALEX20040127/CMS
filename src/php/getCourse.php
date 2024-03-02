<?php
/**
 * 获取课程信息
*/

$code = 0;
$data = [];
$msg = ["获取课程信息失败", "获取课程信息成功"];

// 连接数据库  拼合时删除注释符，完善前缀文件名
include("conn.php");
include("function.php");

$cour_id = $_GET['course_id'];

session_start();
$usr_id = $_SESSION['id'];
$type = $_SESSION['identity'];
if ($cour_id != '') {
    $sql = "SELECT course.*, admin.admin_name FROM course LEFT JOIN admin ON course.teacher_id = admin.admin_id WHERE course.course_id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $cour_id);
    if (mysqli_stmt_execute($stmt)) {
        $code = 1;
        $rs = mysqli_stmt_get_result($stmt);
        while(($row = mysqli_fetch_assoc($rs)) > 0) {
            //对图片进行解码处理
            if ($row['picture_content'] != NULL) {
                $row['picture_content'] = base64_encode($row['picture_content']);
            }
            $data[] = $row;        
        }
    }
    mysqli_stmt_close($stmt);
}
else {

    if ($type == 1) {
        $list_sql = "SELECT course.*, admin.admin_name FROM course LEFT JOIN admin ON course.teacher_id = admin.admin_id WHERE course.teacher_id = ?";
        $list_stmt = mysqli_prepare($conn, $list_sql);
        mysqli_stmt_bind_param($list_stmt, "s", $usr_id);
        if (mysqli_stmt_execute($list_stmt)) {
            $code = 1;
            $list_rs = mysqli_stmt_get_result($list_stmt);
            while(($list_row = mysqli_fetch_assoc($list_rs)) > 0) {
                //对图片进行解码处理
                if ($list_row['picture_content'] != NULL) {
                    $list_row['picture_content'] = base64_encode($list_row['picture_content']);
                }
                $data[] = $list_row;
            }
        }
        mysqli_stmt_close($list_stmt);
    }
    else {
        $list_sql = "select course.*, admin.admin_name from course left join admin on course.teacher_id = admin.admin_id where course_id in (select course_id from score where student_id = ?)";
        $list_stmt = mysqli_prepare($conn, $list_sql);
        mysqli_stmt_bind_param($list_stmt, "s", $usr_id);
        if (mysqli_stmt_execute($list_stmt)) {
            $code = 1;
            $list_rs = mysqli_stmt_get_result($list_stmt);
            while(($list_row = mysqli_fetch_assoc($list_rs)) > 0) {
                //对图片进行解码处理
                if ($list_row['picture_content'] != NULL) {
                    $list_row['picture_content'] = base64_encode($list_row['picture_content']);
                }
                $data[] = $list_row;
            }
        }
        mysqli_stmt_close($list_stmt);
    }
}
mysqli_close($conn);
echo getApiResult($code, $data, $msg);
?>