const ERRORS={
    "panelError":"面板生成错误",
    "loginError":"登录失败"
};


const TABLE_SETTINGS={
    "addStUrl":"src/php/addStudent.php",
    "uploadData":"",
    "getStUrl":"src/php/studentList.php",
    "getScUrl":"src/php/scoreList.php",
    "studentList":{
        "student_id":"学号",
        "student_name":"姓名",
        "gender":"性别",
        "grade":"年级",
        "major":"专业",
        "class":"班级"
    },"List":{
        "student_id":"学号",
        "student_name":"姓名",
        "gender":"性别",
        "grade":"年级",
        "major":"专业",
        "class":"班级"
    },
};
    
const CARD_SETTINGS={
    "color":["bg-primary","bg-warning","bg-success","bg-danger","bg-primary","bg-warning","bg-success","bg-danger"  ],
    "icon":["fa-comments","fa-list","fa-shopping-cart","fa-support"]
}

const PROFILE_SETTINGS={
    "changePwUrl":"src/php/modifyPassword.php",
    "modifyStudentInfoUrl":"src/php/modifyStudentInfo.php",
    "modifyAdminInfoUrl":"src/php/modifyAdminInfo.php",
    "getInferUrl":"src/php/getInfo.php",
    "admin":{
        // "id":["账号","fa-hashtag"],
        // "name":["姓名","fa-user"],
        "mail":["邮箱","fa-envelope-square"],
        "phone":["手机","fa-phone-square"],
    },
    "stduent":{
        // "id":["账号","fa-hashtag"],
        // "student_name":["姓名","fa-user"],
        "mail":["邮箱","fa-envelope-square"],
        "phone":["手机","fa-phone-square"],
        "class":["班级","fa-users"],
        "gender":["性别","fa-transgender-alt"],
        "grade":["年级","fa-calendar"],
        "major":["专业","fa-fort-awesome"]
    }
}


const SCORE_SETTINGS={
    "getWeightUrl":"src/php/getWeight.php",
    "addScoreUrl":"src/php/addScore.php",
    "scoreList":{
        "regular":"表现成绩",
        "homework":"作业成绩",
        "quiz":"小测成绩",
        "project":"大作业成绩",
        "midterm":"期中考试成绩",
        "final":"期末考试成绩",
        "total":"课程成绩"
    },
    "scoreTable":{
        "student_id":"ID",
        "student_name":"姓名",
        "regular_score":"表现成绩",
        "homework_score":"作业成绩",
        "quiz_score":"小测成绩",
        "project_score":"大作业成绩",
        "midterm_score":"期中考试成绩",
        "final_score":"期末考试成绩",
        "total_score":"课程成绩"
    },"scoreInquiryTable":{
        "course_name":"课程",
        "regular_score":"表现成绩",
        "homework_score":"作业成绩",
        "quiz_score":"小测成绩",
        "project_score":"大作业成绩",
        "midterm_score":"期中考试成绩",
        "final_score":"期末考试成绩",
        "total_score":"课程成绩"
    },


    "backgroundColor":["#007bff","#dc3545",
    "#ffc107","#28a745","#59287a","#00c9a7",]
};


const FORM_SETTINGS={
    "title":["Student Information",
    "Teacher Information"],
    "url":["src/php/addStudent.php","src/php/addTeacher"],
    "method":"post",
    "Label":["student_id","student_name","password","Gender","grade","major"],
    "sLabel":"gender",
    "options":["Select Gender",
                "Female",
                "Male",
                "Others"]
};


const COURSE_SETTINGS={
    "getCourseUrl":"src/php/getCourse.php",
    "addCourseUrl":"src/php/addCourse.php",
    "addWeightUrl":"src/php/addWeight.php",
    "course_id":"课程ID",
    "course_name":"课程名字",
    "teacher_id":"教师ID",
    "course_describe":"课程描述",
    "credit":"课程学分"
}

const LOGIN_SETTINGS={
    "formName":"registration",
    "loginUrl":"src/php/loginCheck.php",
    "registerUrl":"src/php/registerCheck.php",
    "loginOutUrl":"src/php/loginOut.php",
    "method":"post",
    "userName":"userName",
    "userPwd":"userPwd",
    "btnLogin":"btnLogin",
    "btnRegister":"btnRegister",
    "imageUrl":"static/images/images.jpg",
    "dataUrl":"src/php/getPanels.php", 
    "errors":ERRORS  
};
