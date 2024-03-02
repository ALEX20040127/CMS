let objContainer = document.getElementsByClassName("container-fluid")[0];

function getId() {
  var sessionValue;
  $.ajax({
    type: "POST",
    url: "src/php/getId.php",
    async:false,
    success: function(res) {
      sessionValue = res;
    }
  });
  return sessionValue;
}

function getType() {
  var sessionValue;
  $.ajax({
    type: "POST",
    url: "src/php/getType.php",
    async:false,
    success: function(res) {
      sessionValue = res;
    }
  });
  return sessionValue;
}


function initData() {
  $(objContainer).empty();
  displayErrors(objContainer, "");
}

/**
 * 生成表格
 */
function creatTable(tableTitle,isEdit,id) {
  // table=new tableComponent(TABLE_SETTINGS);
  $.ajaxSettings.async = false;
  let url;
  let courseId, studentId,input;
  if(tableTitle=="studentTable"){
    url = TABLE_SETTINGS.getStUrl;
    courseId=id;
    input={course_id: courseId};
  }else if(tableTitle=="scoreTable"){
    url = TABLE_SETTINGS.getScUrl;
    studentId="";
    courseId=id;
    input={course_id: courseId, student_id:studentId};
  }else if(tableTitle=="scoreInquiryTable"){
    url = TABLE_SETTINGS.getScUrl;
    studentId=id;
    input={course_id: "", student_id:studentId};
  }
  $.get(
    url,
    input,
    function (res) {
      let code = res[0].code;
      let msg = res[0].msg;
      if (code == 1) {
        let strHtml = tableComponent.appendTable(
          tableTitle,
          res,
          isEdit
        );
        addHtmlIntoDoc(objContainer, strHtml);
        $(document).ready(function () {
          //翻页，改变每页显示数据数量，过滤，排序，页脚信息，自动宽度
          $("#"+tableTitle).DataTable({
            "info": false
          });
        });
      } else {
        displayErrors(objContainer, msg);
      }
      tableComponent.uploadData(courseId);
      tableComponent.addData(courseId,tableTitle);
      tableComponent.modifyStData(courseId);
    },
    "json"
  );
  $.ajaxSettings.async = true;
}


/**
 * 生成学生表格
 */
function creatStTable(couseID) {
  creatTable("studentTable",false,couseID);
}

/**
 * 生成成绩表格
 */
function creatScTable(id) {
  creatTable("scoreTable",true,id);
}

/**
 * 生成成绩表格
 */
function creatScInquirtyTable(id) {
  creatTable("scoreInquiryTable",false,id);
}

/**
 * 生成课程卡片
 */
function creatCard() {
  $.ajaxSettings.async = false;
  $.get(
    COURSE_SETTINGS.getCourseUrl,
    {course_id:""},
    function (res) {
      let code = res[0].code;
      let msg = res[0].msg;
      if (code == 1) {
        let strHtml = cardComponent.appendCard(res[0].data);
        addHtmlIntoDoc(objContainer, strHtml);
        cardComponent.courseClick(res[0].data);
        cardComponent.showTable();
        cardComponent.submitClick();
        console.log("成功");
      } else {
        displayErrors(objContainer, msg);
      }
    },
    "json"
  );
  $.ajaxSettings.async = true;
}




/**
 * 生成课程详情
 */
function createCourseDetails(couseID,type){
  $.get(
    COURSE_SETTINGS.getCourseUrl,
    {course_id : couseID},
    function (data) {
      //请求成功完成后要执行的方法
      if (data[0].code == 1) {
        let course=new courseComponent(COURSE_SETTINGS);
        let strHtml = course.appendcourseHTML(data[0].data);
        addHtmlIntoDoc(objContainer, strHtml);
        if(getType()==1){
          creatPie(couseID);
          creatStTable(couseID)
          cardComponent.saveWeight(couseID);
        }
      }
    },
    "json"
  );
}


/**
 * 生成个人详情
 */
function creatProfile(type) {
  $.ajaxSettings.async = false;
  let id=getId();
  $.get(
    PROFILE_SETTINGS.getInferUrl,
    {},
    function (res) {
      let code = res[0].code;
      let msg = res[0].msg;
      if (code == 1) {
        let strHtml = profile.appendProfile(type, res[0].data[0]);
        addHtmlIntoDoc(objContainer, strHtml);
        profile.detailsEdit();
        profile.changePwClick();
        profile.changeProfile(type,id);
      } else {
        displayErrors(objContainer, msg);
      }
    },
    "json"
  );
  $.ajaxSettings.async = true;
  console.log("成功");
}
/**
 * 生成饼状图
 */
function creatPie(couseID) {
  $.ajaxSettings.async = false;
  $.get(
    SCORE_SETTINGS.getWeightUrl,
    {course_id: couseID},
    function (res) {
      let code = res[0].code;
      let msg = res[0].msg;
      if (code == 1) {
        let strHtml = cardComponent.makePieHTML(res[0].data[0]);
        addHtmlIntoDoc(objContainer, strHtml);
        cardComponent.setPie();
        cardComponent.initPieValue(couseID);
        cardComponent.changePieValue();
        cardComponent.rangeLimit();
      } else {
        displayErrors(objContainer, msg);
      }
    },
    "json"
  );
  $.ajaxSettings.async = true;
  console.log("成功");
}



/**
 * 登录click注册
 */
function createLogin(){
  loginForm=new LoginComponent(LOGIN_SETTINGS);
  let strHtml=loginForm.appendLogin();
  addHtmlIntoDoc(objContainer,strHtml);
  loginForm.blurClick();
  loginForm.selectUserIdentity();
  loginForm.loginClick();
  console.log("成功");
}

/**
 * 注册
 */
function createRegister(){
  login=new LoginComponent(LOGIN_SETTINGS);
  login.blurClick();
  login.selectUserIdentity();
  login.RegisterClick();
  console.log("成功");
}

/**
 * 主程序入口
 */
function init() {
  let title = document.title;
  let id = getId();
  if (title == "课程管理系统————学生列表") {
    creatStTable();
  } else if (title == "课程管理系统————课程管理") {
    creatCard();
  } else if (title == "课程管理系统————管理员信息") {
    creatProfile(1);
  } else if (title == "课程管理系统————个人信息") {
    creatProfile(0);
  }else if(title=="课程管理系统————课程列表"){
    creatCard();
  }else if(title=="课程管理系统————成绩查询"){
    creatScInquirtyTable(id);
  }else if(title=="课程管理系统————课程详情"){
		// 获取查询参数，并显示在页面上
		let urlSearchParams = new URLSearchParams(window.location.search);
		let myString = urlSearchParams.get("couseID");
    createCourseDetails(myString);
  }else if(title=="课程管理系统————登录"){
    createLogin();
  }else if(title=="课程管理系统————注册"){
    createRegister();
  }
}

init();
$("#logoutBtn").on("click", function (e) {
  $.get(
      LOGIN_SETTINGS.loginOutUrl,
      {},
      function (res) {
        let code = res[0].code;
        let msg = res[0].msg;
        if (code == 1) {
          alert(msg);
          window.location.href = "index.html";
        } else {
          alert(msg);
          window.location.href = "index.html";
        }
      },
      "json"
    );
});
