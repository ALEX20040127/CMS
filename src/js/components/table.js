/**
 * 构造表格
 * author：钱浩铭
 * date：2023-5-17
 * version：1.0
 */
let tableComponent = (function () {
  /**
   * 生成列表的html字符串
   * @param {string} tableTitle - 表格的标题名
   * @param {Object} data - 表格数据
   * @returns 列表的html字符串
   */
  function appendTable(tableTitle, data, isEdit) {
    let listTitle, listName;
    if (tableTitle == "studentTable") {
      listName = TABLE_SETTINGS.studentList;
      listTitle = Object.keys(listName);
    } else if (tableTitle == "scoreTable") {
      listName = SCORE_SETTINGS.scoreTable;
      listTitle = Object.keys(listName);
    } else if (tableTitle == "scoreInquiryTable") {
      listName = SCORE_SETTINGS.scoreInquiryTable;
      listTitle = Object.keys(listName);
    }

    let tableHTML =
      '<div class="col-12 id=' + tableTitle + 'ID"><div class="card mb-3">';
    let tableHeaderHTML = makeTableHeaderHTML(tableTitle);
    let tableBodyHTML = makeTableBodyHTML(
      data,
      listTitle,
      isEdit,
      tableTitle,
      listName
    );
    tableHTML += tableHeaderHTML + tableBodyHTML;
    tableHTML += "</div></div>";
    return tableHTML;
  }

  /**
   * 组装好一个表头
   * @param {string} tableTitle - 表格的标题名
   * @returns 表头的html字符串
   */
  function makeTableHeaderHTML(tableTitle) {
    let str = "";
    str += '<div class="card-header">';
    str += '<i class="fa fa-table"></i>' + tableTitle + "</div>";
    return str;
  }

  /**
   * 组装好一个表身
   * @param {string} tableTitle - 表格的标题名
   * @param {Object} data - 表格数据
   * @param {bool} isEdit - 表格是否可编辑
   * @returns 表身的html字符串
   */
  function makeTableBodyHTML(data, listTitle, isEdit, tableTitle, listName) {
    let str = "";
    str += '<div class="card-body">';
    str += '<div class="table-responsive">';
    str +=
      '<table class="table table-bordered" id="' +
      tableTitle +
      '" width="100%" cellspacing="0">';
    str += "<thead>";
    str += "<tr>";
    for (let j = 0; j < listTitle.length; j++) {
      str += "<th>" + listName[listTitle[j]] + "</th>";
    }
    str += "</tr>";
    str += "</thead>";
    str += "<tbody>";
    // 数据
    let count = data[0].data.length;
    for (let i = 0; i < count; i++) {
      str += "<tr>";
      for (let j = 0; j < listTitle.length; j++) {
        if (isEdit)
          str +=
            '<td class="tableDataRow" contenteditable="true">' +
            data[0].data[i][listTitle[j]] +
            "</td>";
        else
          str +=
            '<td class="tableDataRow">' +
            data[0].data[i][listTitle[j]] +
            "</td>";
      }
      str += "</tr>";
    }
    str += "</tbody>";
    str += "</table>";
    str += '<div class="col-5 tableButton">';
    if (tableTitle == "studentTable") {
      str +=
        '<button id="addDataBtn" type="button" class=" btn btn-primary mr-2">添加信息</button>';
      str +=
      '<button id="modifyDataBtn" type="button" class="btn btn-primary mr-2">修改信息</button>';
      str +=
        '<button id="uploadDataBtn" type="button" class="btn btn-primary mr-2">录入成绩</button>';

    } else if (tableTitle == "scoreTable") {
      listIndex = Object.values(SCORE_SETTINGS.scoreTable);
    }

    str += '<span class="dataTips"></span>';
    str + "</div></div></div>";
    return str;
  }

  /**
   * 注册添加数据的事件
   */
  function addData(courseId, tableTitle) {
    $("#addDataBtn").on("click", function () {
      // 保存表头索引的数组
      let listIndex;
      if (tableTitle == "studentTable") {
        listIndex = Object.values(TABLE_SETTINGS.studentList);
      } else if (tableTitle == "scoreTable") {
        listIndex = Object.values(SCORE_SETTINGS.scoreTable);
      } else if (tableTitle == "scoreInquiryTable") {
        listIndex = Object.values(SCORE_SETTINGS.scoreInquiryTable);
      }
      // 创建一个空对象
      let newData = {};
      // 保存新数据的数组
      let dataToAdd = [];
      let s = "";
      // 遍历表头，将新行数据和表头对应起来，存入对象中
      for (let i = 0; i < listIndex.length; i++) {
        newData[listIndex[i]] = s;
        dataToAdd.push(s);
      }
      // 将新的一行数据插入到表格中
      let table = $("#" + tableTitle + "").DataTable();
      newData = ["*学号", "*姓名", "", "", "", ""];
      // 获取第一行的索引
      let index = table.row(0).index();
      // 将新的一行数据插入到表格中
      table.row.add(newData).draw(false);
      // 将第一页滚动到新行的位置
      let pageInfo = table.page.info();
      table.page(pageInfo.pages - 1).draw(false);
      // 将新添加的行设置为可编辑
      let lastIndex = table.rows().count() - 1;
      let rowNode = table.row(lastIndex).node();
      $(rowNode).find("td").attr("contenteditable", true);
      let tableButton = document.getElementsByClassName("tableButton")[0];
      $(tableButton).empty();
      $(tableButton).append(
        '<button id="saveDataBtn" type="button" class=" btn btn-primary mr-2">保存信息</button>'
      );
      saveStData(courseId);
    });
  }

  /**
   * 注册添加数据的事件
   */
  function saveStData(courseId) {
    $("#saveDataBtn").on("click", function () {
      // 遍历表格中的每一行
      var rowData = [];
      $("table tr:last").each(function () {
        // 遍历当前行中的每个单元格
        $(this)
          .find("td")
          .each(function () {
            // 将单元格内容添加到数据对象中
            if ($(this).text() == "") {
              rowData[$(this).index()] = "未知";
            } else {
              rowData[$(this).index()] = $(this).text();
            }
          });
      });
      $.post(
        TABLE_SETTINGS.addStUrl,
        {
          course_id: courseId,
          student_id: rowData[0],
          student_name: rowData[1],
          gender: rowData[2],
          grade: rowData[3],
          major: rowData[4],
          class: rowData[5],
        },
        function (res) {
          let code = res[0].code;
          let msg = res[0].msg;
          if (code == 1) {
            alert(msg);
            location.reload();
          } else {
            alert(msg);
            location.reload();
          }
        },
        "json"
      );
      // location.reload();
    });
  }

  /**
   * 注册修改数据的事件
   */
  function modifyStData(courseId) {
    $("#modifyDataBtn").on("click", function () {
      // 获取表格数据行元素      
      let tableButton = document.getElementsByClassName("tableButton")[0];
      $(tableButton).empty();
      $(tableButton).append(
        '<button id="stopModifyStBtn" type="button" class=" btn btn-primary mr-2">结束修改</button>'
      );
      $("#stopModifyStBtn").on("click", function () {
        location.reload();
      });
      const tableDataRowElems = document.querySelectorAll("#studentTable tbody tr td.tableDataRow");
      
      // 将数据行元素设置为可编辑状态
      tableDataRowElems.forEach((elem) => {
        elem.setAttribute("contenteditable", "true");
      });
      addFocusOutEventListener();
      // }
  
      // 添加一个新函数，用于为表格单元格添加 focusout 事件监听器
      function addFocusOutEventListener() {
        const table = document.getElementById("studentTable");
        table.addEventListener("focusout", handleTableCellFocusOut);
      }
  
      // 处理单元格失焦事件的回调函数
      function handleTableCellFocusOut(event) {
        const target = event.target;
        if (target.classList.contains("tableDataRow")) {
          // 获取修改后的值
          const newValue = target.textContent;
  
          // 获取行和列索引
          const row = target.parentElement.rowIndex;
          const col = target.cellIndex;
  
          // const keys = Object.keys(SCORE_SETTINGS.scoreInquiryTable);  // 获取所有键
          // const values = Object.values(SCORE_SETTINGS.scoreInquiryTable);  // 获取所有值
          // 假设你有一个 id 为 "myTable" 的表格
          const table = document.getElementById("studentTable");
          const rowValue = table.rows[row].cells[0].textContent;
          const afterData = table.rows[row].cells[col].textContent;
          let rowData=["","","","","","","","",""];
          rowData[col]=afterData;
      $.post(
        PROFILE_SETTINGS.modifyStudentInfoUrl,
        {
          id: rowValue,
          gender: rowData[2],
          grade: rowData[3],
          major: rowData[4],
          class: rowData[5],
        },
        function (res) {
          let code = res[0].code;
          let msg = res[0].msg;
          if (code == 1) {
            alert(msg);
          } else {
            alert(msg);
            location.reload();
          }
        },
        "json"
      );
        }
      }
    });
  }

  /**
   * 注册保存信息的事件
   */
  function uploadData(courseId) {
    $("#uploadDataBtn").on("click", function () {
      creatScTable(courseId);
      let tableButton = document.getElementsByClassName("tableButton")[0];
      $(tableButton).empty();
      $(tableButton).append(
        '<button id="saveDataBtn" type="button" class=" btn btn-primary mr-2">保存信息</button>'
      );

      recordScore();
      $("#saveDataBtn").on("click", function () {
        location.reload();
      });
    });
  }


  /**
   * 注册成绩录入的事件
   */
  function recordScore() {
    // 在 makeTableBodyHTML 函数的末尾添加以下代码
    // if (tableTitle === "scoreTable") {
      addFocusOutEventListener();
    // }

    // 添加一个新函数，用于为表格单元格添加 focusout 事件监听器
    function addFocusOutEventListener() {
      const table = document.getElementById("scoreTable");
      table.addEventListener("focusout", handleTableCellFocusOut);
    }

    // 处理单元格失焦事件的回调函数
    function handleTableCellFocusOut(event) {
      const target = event.target;
      if (target.classList.contains("tableDataRow")) {
        // 获取修改后的值
        const newValue = target.textContent;

        // 获取行和列索引
        const row = target.parentElement.rowIndex;
        const col = target.cellIndex;

        const keys = Object.keys(SCORE_SETTINGS.scoreInquiryTable);  // 获取所有键
        const values = Object.values(SCORE_SETTINGS.scoreInquiryTable);  // 获取所有值
        // 假设你有一个 id 为 "myTable" 的表格
        const table = document.getElementById("scoreTable");
        const rowValue = table.rows[row].cells[0].textContent;
        const afterData = table.rows[row].cells[col].textContent;
        const pElements = document.querySelectorAll("body#page-top.fixed-nav.sticky-footer.bg-dark div.content-wrapper div.container-fluid div.col div.course-header div.row.align-items-center div.row-0 div.row p.col-sm-9");
        let rowData=["","","","","","","","",""];
        rowData[col]=afterData;
        $.post(
          SCORE_SETTINGS.addScoreUrl,
          {
            student_id: rowValue,
            course_id: pElements[0].innerText,
            regular_score: rowData[2],
            homework_score: rowData[3],
            quiz_score: rowData[4],
            project_score: rowData[5],
            midterm_score: rowData[6],
            final_score:rowData[7]
          },
          function (res) {
            let code = res[0].code;
            let msg = res[0].msg;
            if (code == 1) {

            } else {
              alert(msg);
              location.reload();
            }
          },
          "json"
        );


      }
    }
  }

  return {
    appendTable: appendTable,
    makeTableHeaderHTML: makeTableHeaderHTML,
    makeTableHeaderHTML: makeTableHeaderHTML,
    addData: addData,
    uploadData: uploadData,
    modifyStData: modifyStData
  };
})();
