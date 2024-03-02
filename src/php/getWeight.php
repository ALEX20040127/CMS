<?php
/**
 * 提取权重信息
*/

$code = 0;
$data = [];
$msg = ["提取成绩权重失败", "提取成绩权重成功"];

// 连接数据库  拼合时删除注释符，完善前缀文件名
include("conn.php");
include("function.php");

$cour_id = $_GET['course_id'];

if ($cour_id != '') {
    $sql = "select regular_weight, homework_weight, quiz_weight, project_weight, midterm_weight, final_weight from course where course_id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $cour_id);
    mysqli_stmt_execute($stmt);
    $rs = mysqli_stmt_get_result($stmt);
    if ($row = mysqli_num_rows($rs) > 0) {
        $code = 1;
        while ($row = mysqli_fetch_row($rs)) {
            $data[]=$row;
            for($i=0; $i<count($row);$i++){
                $data[$i]=floatval($row[$i])*100;
            }
        }
    }
    mysqli_stmt_close($stmt);
}

mysqli_close($conn);
echo getApiResult($code, $data, $msg);
?>
