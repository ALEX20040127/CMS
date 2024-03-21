 /**
 * 构造卡片和环形图
 * author：钱浩铭
 * date：2023-5-18
 * version：1.0
 */
let cardComponent = (function () {
  /**
   * 生成卡片的的html字符串
   * @param {Object} data - 卡片数据（课程的名称）
   * @returns 列表的html字符串
   */
  function appendCard(data) {
    let cardHTML = '<div class="col"><div class="row">';
    for (let i = 0; i < data.length; i++) {
      let card = makeOneCard(data[i], "");
      cardHTML += card;
    }
    cardHTML += makeOneCard("null", "null");
    cardHTML += addCourse();
    cardHTML += "</div></div>";
    return cardHTML;
  }

  /**
   * 组装好一个卡片
   * @returns 卡片的html字符串
   */
  function makeOneCard(data,name) {
    let str = "";
    if (name == "null") {
      str += '<div class="col-xl-3 col-sm-6 mb-4" id="addCourseBtn">';
      str += '<div class="card text-white bg-secondary o-hidden h-100">';
      str +=
        '<div class="card-body d-flex justify-content-center align-items-center">';
      str += '<i class="fa fa-plus-circle" style="font-size: 70px;"></i>';
      str += "</div>";
      str += "</div></div>";
    } else {
      str += '<div class="col-xl-3 col-sm-6 mb-4 ">';
      str +=
        '<div class="card text-white o-hidden h-100 courseCard" style="background-image: url(\'static/images/'+'3_'+data.course_id+'.jpg\'); background-size: 100% 100%;">';
      str += '<div class="card-body">';
      str += '<div class="onOverlay">';
      str += '<h4">' + data.course_name + "</h4>";
      str += "</div>";
      str += '<div class="overlay"></div>';
      str += "</div>";
      str += '<a class="card-footer text-white clearfix small z-1" href="#">';
      str += '<span class="float-left onOverlay">' + "查看详情" + "</span>";
      str += '<span class="float-right">';
      str += '<i class="fa fa-angle-right"></i>';
      str += "</span>";
      str += "</a>";
      str += "</div></div>";
    }
    return str;
  }

  /*
   * 卡片点击事件 
   * */ 
  function courseClick(data) {
    for (let i = 0; i < data.length; i++) {
      $(".courseCard").eq(i).click(function () {
        let course=new courseComponent(COURSE_SETTINGS);
        let strHtml = ""+data[i].course_id;
        var queryString = "?couseID=" + strHtml;
        if(getType()==1){
        window.location.href = "admin-course.html" + queryString;
        }else{
          window.location.href = "student-course.html" + queryString;
        }
      });
    }
  }


  /**
 * 添加课程表格
 */
function addCourse(){
  let str="";

  str+="<div id=\"floating-table\" style=\"display:none\">";

  str+="<form>";
  str+="<label >课程ID:</label><br>";
  str+="<input type=\"text\" id=\"course_id\ name=\"course_id\"><br><br>";
  // str+="<label >教师ID:</label><br>"
  // str+="<input type=\"text\" id=\"teacher_id\" name=\"teacher_id\"><br><br>";
  str+="<label >课程描述:</label><br>"
  str+="<input type=\"text\" id=\"course_describe\" name=\"course_describe\"><br><br>";
  str+="<label >学分:</label><br>"
  str+="<input type=\"text\" id=\"credit\" name=\"credit\"><br><br>";

  str+="<input type=\"submit\" value=\"提交\" id=\"btnCourseData\">";
  str+="</form>" 
  str+="</div>"

  return str;
}

function showTable() {
    $("#addCourseBtn").click(function(){
      document.getElementById("floating-table").style.display = "block";
  })
}

/**
* 提交课程信息事件
*/
function submitClick(){
$("#btnCourseData").click(function(){
  let url="src/php/addCourse.php";
  let cid=$("#course_id").val();
  // let tid=$("#teacher_id").val();
  let credit=$("#credit").val();
  let cde = $("#course_describe").val();
  console.log(cid,tid,credit,cde);
  $.post(
      url,
      {course_name:cid ,
      credit:credit,
      course_describe:cde},
      function (res) {
        let code = res[0].code;
        let msg = res[0].msg;
        if (code == 1) {
          console.log(msg);
          alert("成功");
          // let str = makeOneCard(cid);
          // objContainer.append(str);
        } else {
          console.log(msg);
        }
      },
      "json"
    );
})
}

  /**
   * 组装一个饼状图
   * @returns 饼状图的html字符串
   */
  function makePieHTML(data) {
    const listTitle = Object.keys(SCORE_SETTINGS.scoreList);
    let str = "";
    str += '<div class="col-12 pie">';
    str += '<div class="card mb-3">';
    str += '<div class="card-header">';
    str += '<i class="fa fa-pie-chart"></i>成绩权重</div>';
    str += '<div class="card-body">';
    str += '<div class="row">';
    str +=
      '<div class="col-md-5"> <canvas id="myPieChart" width="100%" height="300px"></canvas> </div>';
    str += '<div class="col-md-5">';
    str += "<form>";
    for (let i = 0; i < listTitle.length - 1; i++) {
      str +=
        '<div class="form-group"> <label id="range' +
        i +
        '">' +
        SCORE_SETTINGS.scoreList[listTitle[i]] +
        '</label> <input type="range"';
      str +=
        'class="form-control-range" min="0" max="100" step="5" oninput="cardComponent.changePieValue()"> </div>';
    }
    str += "<form>";
    str += "</div>";
    str +=
      '<div class="col-md-2  d-flex justify-content-center align-items-center ">';
    str +=
      '<button type="button" class="btn btn-primary" id="modifyPieValueBtn">保存</button>';
    str += "</div>";
    str += "</div>";
    str += "</div></div>";
    return str;
  }

  /**
   * 注册饼状图的各部分比例
   */
  function setPie() {
    // 饼状图
    var ctx = document.getElementById("myPieChart");
    myPieChart = new Chart(ctx, {
      type: "doughnut",
      options: {
        legend: {
          position: "left",
        },
        responsive: true, // 设置图表为响应式，根据屏幕窗口变化而变化
        maintainAspectRatio: false, // 保持图表原有比例
      },
      data: {
        labels: ["表现成绩", "作业成绩", "小测成绩", "大作业成绩", "期中考试成绩","期末考试成绩"],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "#007bff",
              "#dc3545",
              "#ffc107",
              "#28a745",
              "#59287a",
              "#00c9a7",
            ],
          },
        ],
      },
    });
    return myPieChart;
  }

  /**
   * 初始化环形图
   */
  function initPieValue(couseId) {
    // 获取滑块元素
    // var userid = sessionStorage.getItem("userid");
    $.get(
      SCORE_SETTINGS.getWeightUrl,
      { course_id: couseId },
      function (res) {
        let code = res[0].code;
        let msg = res[0].msg;
        if (code == 1) {
          const listTitle = Object.keys(SCORE_SETTINGS.scoreList);
          let inputNums = listTitle.length - 1;
          var arrValue = new Array();
          arrValue = res[0].data;
          var rangeInput =
            document.getElementsByClassName("form-control-range"); // 获取 <input type="range"> 元素
          for (let i = 0; i < inputNums; i++) {
            rangeInput[i].value = arrValue[i];
            rangeInput[i].style.backgroundImage =
              "linear-gradient(to right,#007bff , #007bff " +
              arrValue[i] +
              "%, #F00A0A " +
              arrValue[i] +
              "%,#F00A0A 0%, #d5d5d5 0%,#d5d5d5 100%)";
          }
          Chart.instances[0].data.datasets[0].data = arrValue;
          Chart.instances[0].update();
          const rangeElement = this;
        } else {
          alert(msg);
        }
      },
      "json"
    );
  }

  /**
   * 限制环形图范围选择器的具体输入范围(确实这部分写的有点丑)
   */
  function rangeLimit() {
    const rangeInput = document.getElementsByClassName("form-control-range");
    const listTitle = Object.keys(SCORE_SETTINGS.scoreList);
    let inputNums = listTitle.length - 1;
    for (let i = 0; i < inputNums; i++) {
      rangeInput[i].addEventListener("input", function (event) {
        let sum = 0;
        for (let j = 0; j < inputNums; j++) {
          if (j != i) sum += parseInt(rangeInput[j].value);
        }
        if (sum + parseInt(this.value) > 100) {
          this.value = 100 - sum;
        }
        this.previousElementSibling.innerHTML =
          '<label id="range' +
          i +
          '">' +
          SCORE_SETTINGS.scoreList[listTitle[i]] +
          " > " +
          this.value +
          "%</label>";
        for (let j = 0; j < inputNums; j++) {
          const rangeElement = rangeInput[j];
          let thisValue = rangeElement.value;
          let remain =
            parseInt(Chart.instances[0].data.datasets[0].data[inputNums]) +
            parseInt(thisValue);
          rangeElement.style.backgroundImage =
            "linear-gradient(to right,#007bff , #007bff " +
            thisValue +
            "%, #6db4ff " +
            thisValue +
            "%,#6db4ff " +
            remain +
            "%, #d5d5d5 " +
            remain +
            "%,#d5d5d5 100%)";
        }
        changePieValue();
      });
    }
  }

  /**
   * 注册修改环形图的值事件
   */
  function changePieValue() {
    // 获取滑块元素
    const listTitle = Object.keys(SCORE_SETTINGS.scoreList);
    let inputs = document.getElementsByClassName("form-control-range");
    let inputNums = listTitle.length - 1;
    var arrValue = new Array();
    let sum = 0;
    for (let i = 0; i < inputNums; i++) {
      arrValue.push(inputs[i].value);
      sum += parseInt(inputs[i].value);
    }
    arrValue.push(100 - sum > 0 ? 100 - sum : 0);
    myPieChart.data.datasets[0].data = arrValue;
    myPieChart.update();

    for (let i = 0; i < inputNums; i++) {
      const rangeElement = document.querySelector('[id="range' + i + '"]');
      rangeElement.innerHTML =
        '<label id="range' +
        i +
        '">' +
        SCORE_SETTINGS.scoreList[listTitle[i]] +
        " :  " +
        arrValue[i] +
        "%</label>";
    }
  }

  /**
   * 提交成绩权重
   */
  function saveWeight(couseId) {
      $("#modifyPieValueBtn").click(function () {
        // 获取滑块元素
        const listTitle = Object.keys(SCORE_SETTINGS.scoreList);
        let inputs = document.getElementsByClassName("form-control-range");
        let inputNums = listTitle.length - 1;
        var arrValue = new Array();
        for (let i = 0; i < inputNums; i++) {
          arrValue.push(parseInt(inputs[i].value));
        }
        $.post(
          COURSE_SETTINGS.addWeightUrl,
          { course_id: couseId, weight: arrValue },
          function (res) {
            let code = res[0].code;
            let msg = res[0].msg;
            if (code == 1) {
              alert(msg);
              location.reload();
            } else {
              alert(msg);
            }
          },
          "json"
        );
      });
  }

  return {
    appendCard: appendCard,
    makeOneCard: makeOneCard,
    makePieHTML: makePieHTML,
    setPie: setPie,
    initPieValue: initPieValue,
    changePieValue: changePieValue,
    saveWeight: saveWeight,
    rangeLimit: rangeLimit,
    courseClick: courseClick,
    showTable:showTable,
    submitClick:submitClick
  };
})();
