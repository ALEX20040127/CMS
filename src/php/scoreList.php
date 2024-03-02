<?php
/**
 * 成绩查询
 */


    $code = 0;
    $data = [];
    $msg = ["成绩查询失败", "成绩查询成功"];
    
    //拼合时删除注释符，完善前缀文件名
    include('conn.php');
    include('function.php');
    session_start();
    $stu_id = $_SESSION['id'];
    $cour_id = $_GET['course_id'];
    

    if ($cour_id == '') {
        $sql = "select  course.course_name, score.regular_score, homework_score, quiz_score, project_score, midterm_score, final_score, total_score from score left join course on score.course_id = course.course_id where student_id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $stu_id);
        mysqli_stmt_execute($stmt);
        $rs = mysqli_stmt_get_result($stmt);
        if ($rs) {
            $code = 1;
            while($row = mysqli_fetch_assoc($rs)) {
                foreach ($row as $key => $value) {
                    if ($value === null) {
                      $row[$key] = "";
                    }
                  }
                $data[] = $row;
            }
        }
    }
    else  {
        $sql = "select student.student_id, student.student_name, score.regular_score, homework_score, quiz_score, project_score, midterm_score, final_score, total_score from score left join student on score.student_id = student.student_id where course_id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $cour_id);
        mysqli_stmt_execute($stmt);
        $rs = mysqli_stmt_get_result($stmt);
        if ($rs) {
            $code = 1;
            while($row = mysqli_fetch_assoc($rs)) {
                foreach ($row as $key => $value) {
                    if ($value === null) {
                      $row[$key] = "";
                    }
                  }
                $data[] = $row;
            }
        }
        
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
    echo getApiResult($code, $data, $msg);
    ?>