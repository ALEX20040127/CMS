/**
 * 搭建个人信息页
 * author：钱浩铭
 * date：2023-5-20
 * version：1.0
 */
let profile = (function () {
  /**
   * 个人信息页的html字符串
   * @param {bool} type - 个人信息的对象类型
   * @param {Object} data - 个人信息数据
   * @returns 列表的html字符串
   */
  function appendProfile(type, data) {
    let dateTitle = PROFILE_SETTINGS.stduent;
    let listTitle = Object.keys(PROFILE_SETTINGS.stduent);
    if (type) {
      dateTitle = PROFILE_SETTINGS.admin;
      listTitle = Object.keys(PROFILE_SETTINGS.admin);
    }
    let profileHTML = '<div class="col">';
    profileHTML += makeProfileHeadHTMl(type, data);
    profileHTML += makeSwitchHTMl();
    profileHTML += makeDetailsbHTMl(data, listTitle, dateTitle);
    profileHTML += "</div>";

    return profileHTML;
  }

  /**
   * 组装好一个头像部分
   * @param {string} type - 个人信息的对象类型
   * @param {Object} data - 个人信息数据
   * @returns 头像部分的html字符串
   */
  function makeProfileHeadHTMl(type, data) {
    let str = "";
    str += '<div class="profile-header">';
    str += '<div class="row align-items-center">';
    str += '<div class="col-auto profile-image mb-3">';
    str += '<a href="#">';
    let imgSrc = "static/images/defat.jpg";


    if (type) {
        imgSrc ='static/images/'+type+'_'+data["admin_id"]+'.jpg';
        imgSrc=checkImagePath(imgSrc);
      }

      // if(checkImageExists(imgSrc)){
      //   imgSrc = "static/images/default.jpg";
      // }
      else {
      imgSrc = 'static/images/'+type+'_'+data["student_id"]+'.jpg';
      imgSrc = checkImagePath(imgSrc);
      }

      // if(checkImageExists(imgSrc)){
      //   imgSrc = "static/images/default.jpg";
      // }
    str += '<img class="rounded-circle profile" alt="User Image" height="70" width="70" src='+imgSrc+' style="border-radius: 50%;">';
    str += "</a>";
    str += "</div>";
    str += '<div class="col ml-md-n2 profile-user-info">';
    if (type) {
      str += '<h4 class="user-name mb-0">' + data["admin_name"] + "</h4>";
      str += '<h6 class="text-muted">' + data["admin_id"] + "</h6>";
    } else {
      str += '<h4 class="user-name mb-0">' + data["student_name"] + "</h4>";
      str += '<h6 class="text-muted">' + data["student_id"] + "</h6>";
    }
    str += "</div>";
    str += '<div class="col-auto profile-btn">';
    str += "</div></div></div>";
    return str;
  }

  /**
   * 组装切换菜单
   * @returns html字符串
   */
  function makeSwitchHTMl() {
    let str = "";
    str += '<div class="profile-menu">';
    str += '<ul class="nav nav-tabs nav-tabs-solid">';
    str += ' <li class="nav-item">';
    str +=
      '<a class="nav-link active" data-toggle="tab" href="#per_details_tab">个人信息</a>';
    str += "</li>";
    str += '<li class="nav-item">';
    str +=
      '<a class="nav-link" data-toggle="tab" href="#password_tab">修改密码</a>';
    str += " </li>";
    str += "</ul>";
    str += "</div>";
    return str;
  }

  /**
   * 组装个人信息详情html
   * @param {Object} data - 个人信息数据
   * @param {Object} listTitle - 个人信息的标题
   * @param {Object} dateTitle - 个人信息的数据
   * @returns html字符串
   */
  function makeDetailsTabHTMl(data, listTitle, dateTitle) {
    let str = "";
    str += '<div class="tab-pane fade show active" id="per_details_tab">';
    str += '<div class="row">';
    str += '<div class="col">';
    str += '<div class="card">';
    str += '<div class="card-body">';
    str += '<h5 class="card-title d-flex justify-content-between">';
    str += "<span>个人信息详情</span>";
    str +=
      '<div class="edit-link"  id="details-edit"><i class="fa fa-edit mr-1"></i>编辑</div>';
    str += "</h5>";

    for (let j = 0; j < listTitle.length; j++) {
      str += '<div class="row">';
      str +=
        '<p class="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3"><i class= "mb-0 mb-sm-3 mr-2 fa ' +
        dateTitle[listTitle[j]][1] +
        '"></i>' +
        dateTitle[listTitle[j]][0] +
        "</p>";
      str +=
        '<input type="text" readonly class="form-control form-control-plaintext col-sm-3 text-sm-right mb-0 mb-sm-3" value=' +
        data[listTitle[j]] +
        "></input>";
      str += "</div>";
    }

    str += "</div></div></div></div></div>";
    return str;
  }

  /**
   * 组装切换菜单
   * @returns html字符串
   */
  function makePasswordTabHTMl() {
    let str = "";

    str += '<div id="password_tab" class="tab-pane fade">';
    str += '<div class="card">';
    str += '<div class="card-body">';
    str += '<h5 class="card-title"修改密码</h5>';
    str += '<div class="row">';
    str += '<div class="col-md-10 col-lg-6">';
    str += "<form>";

    str += '<div class="form-group">';
    str += "<label>旧密码</label>";
    str +=
      '<input type="password" class="form-control col-sm-4" id="oldPwInput"}>';
    str += "</div>";

    str += '<div class="form-group">';
    str += "<label>新密码</label>";
    str +=
      '<input type="password" class="form-control col-sm-4" id="newPwInput">';
    str += "</div>";
    str += '<div class="form-group">';
    str += "<label>确认密码</label>";
    str +=
      '<input type="password" class="form-control col-sm-4 mb-3" id="confirmPwInput">';
    str +=
      '<button class="btn btn-primary" type="button" id="changePwBtn">保存密码</button>';
    str += "</div>";

    str += "</form></div></div></div></div></div>";
    return str;
  }

  /**
   * 组装切换菜单
   * @param {Object} data - 个人信息数据
   * @param {Object} listTitle - 个人信息的标题
   * @param {Object} dateTitle - 个人信息的数据
   * @returns html字符串
   */
  function makeDetailsbHTMl(data, listTitle, dateTitle) {
    let str = "";
    str += '<div class="tab-content profile-tab-cont">';
    str += makeDetailsTabHTMl(data, listTitle, dateTitle);
    str += makePasswordTabHTMl();
    str += "</div>";
    return str;
  }

  /**
   * 组装编辑
   * @returns html字符串
   */
  function detailsEdit() {
      // 给编辑按钮绑定点击事件
      const editBox = document.getElementById("details-edit");
      $(editBox).click(function () {
        // 获取个人信息详情元素
        let details = $(".card-body");
        let inputs = document.querySelectorAll("[readonly]");
        let inputsNums = inputs.length;
        for (let i = 0; i < inputsNums; i++) {
          inputs[i].readOnly = false;
          inputs[i].classList.remove("form-control-plaintext");
        }
        // 将姓名、账号、邮箱、手机元素替换成输入框

        // 在最后一个 <p> 标签后添加 submit 按钮
        details
          .find("input:last")
          .after(
            '<div class="col-sm-3 text-right"><button id="saveProfileBtn" type="submit" class="btn btn-primary">保存</button></div>'
          );

        // 禁止 submit 按钮的点击事件
        $("#details-edit").remove();
        saveClick();
      });
  }
  /**
   * 注册信息保存事件
   */
  function saveClick() {
      $("#saveProfileBtn").click(function () {
        // 获取个人信息详情元素
        let details = $(".card-body");
        let inferArr = new Array();
        var inputs = details.find("input");
        let inputTags = inputs.length;
        for (let i = 0; i < inputTags; i++) {
          inferArr.push(inputs[i].value);
        }
        let url=PROFILE_SETTINGS.modifyStudentInfoUrl;
        let input = {mail: inferArr[0],phone: inferArr[1],class: inferArr[2],gender: inferArr[3],grade: inferArr[4],major: inferArr[5],id:""};
        if(getType()==1){
          url=PROFILE_SETTINGS.modifyAdminInfoUrl;
          input = {mail: inferArr[0],phone: inferArr[1],phone: inferArr[1],id:""};
        } 
        $.post(
          url,
          input,
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
      });
  }

  /**
   * 注册密码保存事件
   */
  function changePwClick() {
    $("#changePwBtn").click(function () {
      var oldPw = $("#oldPwInput").val();
      var newPw = $("#newPwInput").val();
      var confirmPw = $("#confirmPwInput").val();
      $.post(
        PROFILE_SETTINGS.changePwUrl,
        {
          old_password: oldPw,
          new_password: newPw,
          confirm_password: confirmPw
        },
        function (data) {
          alert(data[0].msg);
        },
        "json"
      );
    });
  }

  /**
   * 注册修改头像事件
   */
  function changeProfile(type,id) {
    $(".profile").click(function () {
      let input = $("<input type='file' accept='image/*'>");
      input.on("change", function () {
        let file = this.files[0];
        let reader = new FileReader();
        reader.onload = function () {
          // Update the profile image with the selected file
          $(".profile").attr("src", reader.result);

          // Upload the file to the server
          let formData = new FormData();
          formData.append("image", file);
        
          let filePath = "static/images/"+type+"_"+id+".jpg"; // 保存文件的路径
          // 检查文件是否存在
          $.ajax({
            url: filePath,
            type: "HEAD",
            success: function () {
              // 文件存在，删除旧文件
              $.ajax({
                url: filePath,
                type: "DELETE",
                success: function () {
                  // 上传新文件
                  uploadFile(filePath, file);
                },
                error: function (xhr, status, error) {
                  console.log("删除旧文件失败：" + error);
                }
              });
            },
            error: function () {
              // 文件不存在，直接上传新文件
              uploadFile(filePath, file);
            }
          });
        },
        reader.readAsDataURL(file);
      });
      input.click();
    });
  }

  //上传图片（*请看计划书）
  function uploadFile(filePath, file) {
    let xhr = new XMLHttpRequest();
    let url = new URL(filePath, window.location.href);
    xhr.open("POST", url.href);
    let formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
  }

  return {
    appendProfile: appendProfile,
    detailsEdit: detailsEdit,
    changePwClick: changePwClick,
    changeProfile: changeProfile
  };
})();