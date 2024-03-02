<?php
/**
* 添加成绩比重
*/

$code = 0;
$data = [];
$msg = ["成绩权重修改失败", "成绩权重比例错误", "成绩权重修改成功"];

// 连接数据库  拼合时删除注释符，完善前缀文件名
include("conn.php");
include("function.php");

$weight = $_POST['weight'];
$cour_id = $_POST['course_id'];



// $weight = array(15, 20, 30, 10, 15, 10);
// 检查成绩比例是否总和为1
$weight_check = 0.0;
for($i = 0; $i < 6; $i++) {
    $weight[$i] /= 100.0;
    $weight_check += $weight[$i];
}

if (abs($weight_check - 1) > 1.1102230246252E-16) {
    $code = 1;
    mysqli_close($conn);
    echo getApiResult($code, $data, $msg);
    die(0);
}

$sql = "update course set regular_weight = ?, homework_weight = ?, quiz_weight = ?, project_weight = ?, midterm_weight = ?, final_weight = ? where course_id = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ddddddi", $weight[0], $weight[1], $weight[2], $weight[3], $weight[4], $weight[5], $cour_id);
if(mysqli_stmt_execute($stmt)){
    $code = 2;
    mysqli_stmt_close($stmt);
}

mysqli_close($conn);
echo getApiResult($code, $data, $msg);
?>


 