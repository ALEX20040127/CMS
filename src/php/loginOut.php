<?php

    //打开会话
    session_start();

    $code = 0;
    $data = [];
    $msg = ["退出失败", "退出成功"];
    
    include("function.php");
    include("conn.php");

    unset($_SESSION['id']);
    unset($_SESSION['identity']);

    //销毁会话
    if (session_destroy()) {
        $code = 1;
    }

    echo getApiResult($code, $data, $msg);
?>