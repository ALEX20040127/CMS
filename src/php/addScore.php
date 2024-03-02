<?php
/**
 * 提交成绩
 */
    $code = 1;
    $data = [];
    $msg = ["成绩提交失败", "成绩提交成功"];

    // 连接数据库  拼合时删除注释符，完善前缀文件名
    include("conn.php");
    include("function.php");

    $stu_id = $_POST['student_id'];
    $cour_id = $_POST['course_id'];
    $regu_sc = $_POST['regular_score'];
    $home_sc = $_POST['homework_score'];
    $quiz_sc = $_POST['quiz_score'];
    $proj_sc = $_POST['project_score'];
    $midt_sc = $_POST['midterm_score'];
    $fina_sc = $_POST['final_score'];

    $sc = array($regu_sc, $home_sc, $quiz_sc, $proj_sc, $midt_sc, $fina_sc);

    //没有学生学号和课程号无法提交
    if ($stu_id == "" || $cour_id== "") {
        $code = 0;
        mysqli_close($conn);
        echo getApiResult($code, $data, $msg);
        die(0);
    }

    //判断合法
    foreach ($sc as $value) {
        if (!($value == null || ($value >= 0 && $value <= 100))) {
            $code = 0;
            mysqli_close($conn);
            echo getApiResult($code, $data, $msg);
            die(0);
        }
    }

    //用一个sc数组存放每个不同的sc，用update_sql存储所有sql语句，
    $update_sql = array(
        "update score set regular_score = ? where student_id = ? and course_id = ?",
        "update score set homework_score = ? where student_id = ? and course_id = ?",
        "update score set quiz_score = ? where student_id = ? and course_id = ?",
        "update score set project_score = ? where student_id = ? and course_id = ?",
        "update score set midterm_score = ? where student_id = ? and course_id = ?",
        "update score set final_score = ? where student_id = ? and course_id = ?",
        );

    //预处理sql语句
    $update_stmt = array();
    foreach ($update_sql as $sql) {
        $update_stmt[] = mysqli_prepare($conn, $sql);
    }
    
    //循环更新每一项成绩，如果非空，则对每一项成绩进行单独修改，若失败code = 0
    for ($i = 0; $i < 6; $i++) {
        if ($sc[$i] != "") {
            mysqli_stmt_bind_param($update_stmt[$i], "dsi", $sc[$i], $stu_id, $cour_id);
            if(!mysqli_stmt_execute($update_stmt[$i])){
                $code = 0;
            }
            mysqli_stmt_close($update_stmt[$i]);
        }
    }

    //提取比重放入weight数组
    
    $select_wei_sql = "select regular_weight, homework_weight, quiz_weight, project_weight, midterm_weight, final_weight from course where course_id = ?";
    $stmt_wei = mysqli_prepare($conn, $select_wei_sql);
    mysqli_stmt_bind_param($stmt_wei, "i", $cour_id);
    mysqli_stmt_execute($stmt_wei);
    $rs1 = mysqli_stmt_get_result($stmt_wei);
    $weight = array();
    if ($row1 = mysqli_num_rows($rs1) > 0) {
        $weight = mysqli_fetch_array($rs1);
        $weight = array_map('floatval', $weight);
    }
    mysqli_stmt_close($stmt_wei);

    //提取成绩放入sc_sel数组
    $select_sc_sql = "select regular_score, homework_score, quiz_score, project_score, midterm_score, final_score from score where student_id = ? and course_id = ?";
    $stmt_sc = mysqli_prepare($conn, $select_sc_sql);
    mysqli_stmt_bind_param($stmt_sc, "si", $stu_id, $cour_id);
    mysqli_stmt_execute($stmt_sc);
    $rs2 = mysqli_stmt_get_result($stmt_sc);
    $sc_sel = array();
    if ($row2 = mysqli_num_rows($rs2) > 0) {
        $sc_sel = mysqli_fetch_array($rs2);
        $sc_sel = array_map('floatval', $sc_sel);
    }
    mysqli_stmt_close($stmt_sc);

    $tot_sc = 0.0;
    //对应关系准确，使用索引计算tot_sc
    for ($i = 0; $i < 6; $i++) {
        if ($sc_sel[$i] != NULL) {
            $tot_sc += $sc_sel[$i] * $weight[$i];
        }
    }
    //将tot_sc存入数据库
    $update_tot_sql = "update score set total_score = ? where student_id = ? and course_id = ?";
    $update_tot_stmt = mysqli_prepare($conn, $update_tot_sql);
    mysqli_stmt_bind_param($update_tot_stmt, "dsi", $tot_sc, $stu_id, $cour_id);
    if(!mysqli_stmt_execute($update_tot_stmt)){
        $code = 0;
    }
    mysqli_stmt_close($update_tot_stmt);
    
    mysqli_close($conn);
    echo getApiResult($code, $data, $msg);
?>