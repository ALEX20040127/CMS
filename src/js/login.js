class LoginComponent{
    /**
     * 登录组件的构造器
     * @param {Object} loginSettings - 登录框的配置对象
     */
    constructor(loginSettings){
        this.loginSettings=loginSettings;
        this.nameFlag=0;
        this.pwdFlag=0;
        this.idFlag=0;
        this.identity=1;//默认管理员
        this.dispError("");
    }


    /**
     * 生成登录框的html字符串
     * @returns 登录框的html字符串
     */
    appendLogin(){
        let formHtml=this.makeLoginForm(this.loginSettings.formName,
                                   this.loginSettings.method,
                                   this.loginSettings.userName,
                                   this.loginSettings.userPwd,
                                   this.loginSettings.btnLogin,
                                   this.loginSettings.btnRegister);

        //let imageHtml=this.makeLoginImage(this.loginSettings.imageUrl);
        let retLoginHtml=this.makeLogin(this.loginSettings.id,formHtml);
    
        return retLoginHtml;
    }

    /**
     * 组装好一个登录框
     * @param {String} id -登录框的id名
     * @param {String} formHtml - 登录框中form的html字符串
     * @param {String} imageHtml - 登录框右边的图像html字符串
     * @returns 登录框结构组成的html字符串
     */
    makeLogin(id,formHtml,imageHtml){
        let str="";
        // str+="<div class=\"login\" id='"+id+"'>";
        str+=formHtml;
        // str+=imageHtml;
        // str+="</div>";
        return str;
    }

    /**
     * 
     * @param {String} name - 表单名
     * @param {String} url - php处理脚本
     * @param {String} method - 提交方式
     * @param {String} userName - 登录名命名
     * @param {String} userPwd - 密码命名
     * @param {String} btnLogin - 登录按钮的id命名
     * @returns 登录表单html串
     */
    makeLoginForm(name,method,userName,userPwd,btnLogin,btnRegister){
        let str="";

        str+="<form class=\""+name+"\" method=\""+method+"\" >";
        str+="<h1>👋 欢迎!</h1>";
        str+="<div class=\"login\">";
        str+="<div class=\"pure-material-textfield-outlined\">";
        str+="<input placeholder=\"请输入用户名\" type=\"text\" id=\""+userName+"\" required>";
        str+="</div>";
  
        str+="<div class=\"pure-material-textfield-outlined\">";
        str+="<input placeholder=\"请输入密码\" type=\"password\" id=\""+userPwd+"\" required>";
        str+="</div>";
        str+="<div class=\"errors\" id=\"loginError\"></div>";

        str += "<div class='userIdentity'>"
        str += "<select name='user-identity'>";
        str += "<option value='manager' selected>教师</option>";
        str += "<option value='student'>学生</option>";
        str += "</select>";
        str += "</div>";
        str +="</div>";

        str+="<div class=\"button\">";
        str+="<button id=\""+btnLogin+"\" type=\"button\">登录</button>";
        str+="</div>";
        str+="<div class=\"text-center dont-have\">没有账户? <a href=\"register.html\">立即注册</a></div>"
        // str+="<button id=\""+btnRegister+"\" type=\"button\">注册</button>";
        str+="</form>";

        return str;
    }


    /**
     * 管理端和学生端选择判断
     */
    selectUserIdentity() {
        let _this = this;
        $(".userIdentity").children("select").on("click", function (e) {
            let options = $("select option:selected").val();
            if (options == "student") {
                _this.identity=0;
            }
            else if (options == "manager") {
                _this.identity=1;
            }
        });

    }

    /**
     * 
     * @param {Object} input - 要判断的input对象
     * @param {Number} index - 错误显示数组中的index
     * @returns 是否通过检验，true，通过；false，不通过
     */
    checkInputLen(input,index){
        let len=input.val().length;
        let arrs=['用户ID不合法','密码不合法'];
        this.dispError("");
        if(len<4 || len<=0){
            this.dispError(arrs[index]);
            return false;
        }
        return true;
    }

    /**
     * 
     * @param {String} str - 登录过程中的错误显示
     */
    dispError(str){
        $("#loginError").text(str);
    }

    /**
     * 注册失去焦点事件
     */
    blurClick(){
        let _this=this;
        this.dispError("");
        $("#"+this.loginSettings.userName).on("blur",function(e){
            if(_this.checkInputLen($(this),0))  _this.nameFlag=1;
        });

        $("#"+this.loginSettings.userPwd).on("blur",function(e){
            if(_this.checkInputLen($(this),1))  _this.pwdFlag=1;
        });

        $("#userID").on("blur",function(e){
            // if(_this.checkInputLen($(this),2))
              _this.idFlag=1;
        });
    }

    /**
     * 注册登录按钮事件
     * @param {String} handler - 面板解析函数名
     */
    loginClick(){
        let _this=this;
        $("#"+this.loginSettings.btnLogin).on("click",function(e){
                if(_this.isPassCheck()){
                    console.log("userid"+$("#"+_this.loginSettings.userName).val()+
                                "password"+$("#"+_this.loginSettings.userPwd).val()+
                                "identity1"+_this.identity
                    )
                    $.ajax(
                        {
                            async:false,
                            url:"src/php/loginCheck.php",
                            data:{
                                "userid":$("#"+_this.loginSettings.userName).val(),
                                "password":$("#"+_this.loginSettings.userPwd).val(),
                                "identity":_this.identity
                            },
                            method:_this.loginSettings.method,
                            success:function(res){
                                console.log(res);
                                if(res[9]=="1"){
                                    if(_this.identity==1){
                                        window.location.href="course-manage.html";
                                    }
                                    else{
                                        window.location.href="course-list.html";
                                    }
                                }else{
                                    _this.dispError(_this.loginSettings.errors.loginError);
                                }
                            }
                        }
                    )
                    
                }else{
                    _this.dispError(_this.loginSettings.errors.loginError);
                }
        });
    }

    /**
     * 注册用户注册按钮事件
     * @param {String} handler - 面板解析函数名
     */
    RegisterClick(){
        let _this=this;
        $("#"+this.loginSettings.btnRegister).on("click", function (e) {
            // console.log("userid"+$("#"+_this.loginSettings.userName).val()+
            //     "password"+$("#"+_this.loginSettings.userPwd).val()+
            //     "identity"+_this.identity)
            if(_this.isPassCheck()&&_this.idFlag==1){
                
                let uname=$("#userName").val();
                let pwd=$("#userPwd").val();
                let uid=$("#userID").val();
                let idty = _this.identity;
                $.post(
                    LOGIN_SETTINGS.registerUrl,
                    {id: uid, pwd: pwd, identity:idty, name:uname},
                    function (res) {
                      let code = res[0].code;
                      let msg = res[0].msg;
                      if (code == 3) {
                        // if(_this.identity==1){
                                window.location.href = "index.html";
                                console.log("注册成功");
                                alert("管理员注册成功");
                            // }else{
                            //     window.location.href = "login.html";
                            //     console.log("注册成功");
                            //     alert("注册成功");
                            // }
                      } else {
                        _this.dispError(_this.loginSettings.errors.registerError);
                        console.log(msg);
                      }
                    },
                    "json"
                  );
                }else{
                    _this.dispError(_this.loginSettings.errors.registerError);
                }
    })
}

    /**
     * 
     * @returns 登录框和密码框长度校验是否通过，true，通过；false，不通过
     */
    isPassCheck(){
        if(this.nameFlag && this.pwdFlag)
            return true;
        else
            return false;
    }
}
