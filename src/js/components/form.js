/**
* 构造表单
* author：吴雨非
* date：2023-5-17
* version：1.0
*/
class formComponent{
    /**
     * 表单组件的构造器
     * @param {Object} formComponent
     */
    constructor(FORM_SETTINGS){
        this.formSettings=FORM_SETTINGS;
        
    }

    /**
     * 生成学生表单的html字符串
     * @returns 表单的html字符串
     */
    appendStudentForm(){
        let formHeaderHTML=this.makeFormHeaderHtml(this.formSettings.title[0]);
        let formBodyHTML=this.makeStdFormBodyHtml(this.formSettings.url[0],
                                            this.formSettings.method,
                                            //this.formSettings.sLabel,
                                                );
        let formFootHTML=this.makeFormFootHtml();
        let formHTML=this.makeFormHtml(formHeaderHTML,formBodyHTML,formFootHTML);

        return formHTML;
    }

    /**
     * 生成老师表单的html字符串
     */
    appendTeacherForm(){
        let formHeaderHTML=this.makeFormHeaderHtml(this.formSettings.title[1]);
        let formBodyHTML=this.makeTchFormBodyHtml(this.formSettings.url[1],
                                            this.formsettings.method,
                                            this.formSettings.Label,
                                                );
        let formFootHTML=this.makeFormFootHtml();
        let formHTML=this.makeFormHtml(formHeaderHTML,formBodyHTML,formFootHTML);

        return formHTML;
    }

    /**
     * 组装一个表单
     */
    makeFormHtml(formHeaderHTML,formBodyHTML,formFootHTML){
        let str="";
        
        str+=formHeaderHTML;
        str+=formBodyHTML;
        str+=formFootHTML;

        return str;
    }

    /**
     * 组装好一个表单表头
     * @param {String} title -表单标题 
     * @returns 表单表头的html
    */
    makeFormHeaderHtml (title){
        let str="";  
        
        str+="<div class=\"col-12\">";
		str+="<h5 class=\"form-title\"><span>\""+title+"\"</span></h5>";
		str+="</div>";
        return str;
    }


    /**
     * 输入框
     * @param {String} Label -输入框标题
     */
    makeinput(Label){
        let str="";

        str+="<div class=\"col-12 col-sm-6\">";
		str+="<div class=\"form-group\">";
		str+="<label>\""+Label+"\"</label>";
		str+="<input type=\"text\" name=\""+Label+"\" class=\"form-control\">";
		str+="</div>";
		str+="</div>";

        return str;
    }

    // /**
    //  * 选择框
    //  * @param {String} sLabel -选择框标题
    //  * @param {String} options -选择项
    //  */
    // makeselect(sLabel){
    //     let str="";

    //     str+="<div class=\"col-12 col-sm-6\">"
	// 	str+="<div class=\"form-group\">";
	// 	str+="<label>\""+sLabel+"\"</label>";
	// 	str+="<select class=\"form-control\">";
    //     for(let i=0;i<4;i++){
    //         str+="<option>\""+this.formSettings.options[i]+"\"</option>";
    //     }
	// 	str+="</select>";
	// 	str+="</div>";
	// 	str+="</div>";

    //     return str;
    // }
     
    /**
     * 组装好一个学生表单表身
     * @param {String} url - php处理脚本
     * @param {String} method - 提交方式
     * @param {String} sLabel -选择框标题
     * @returns 表单表身的html字符串
     */
    makeStdFormBodyHtml(url,method,sLabel){
        let str="";
        
        str+="<form id=\"myForm\" action=\""+url+"\" method=\""+method+"\">";
        str+="<div class=\"row\">";

        //学生姓名，学号
        for(let i=0;i<6;i++){
            str+=this.makeinput(this.formSettings.Label[i]);
        }

        // //学生性别
		// str+=this.makeselect(sLabel);

        str+="</div>";
		str+="</form>";

        return str;
    }

    /**
     * 组装好一个老师表单表身
     * @param {String} url - php处理脚本
     * @param {String} method - 提交方式
     * @returns 表单表身的html字符串
     */
    makeTchFormBodyHtml(url,method){
        let str="";
        
        str+="<form id=\"myForm\" action=\""+url+"\" method=\""+method+"\">";
        str+="<div class=\"row\">";

        for(let i=0;i<3;i++){
            str+=this.makeinput(this.formSettings.Label[i]);
        }

        str+="</div>";
		str+="</form>";

        return str;
    }


    /**
     * 组装好一个表的尾
     * @returns 表单表尾的html字符串
     */
    makeFormFootHtml(){
        let str="";
        //提交按钮								
		str+="<div class=\"col-12\">";
		str+="<input type=\"submit\" id=\"btnForm\" value=\"Submit\" onclick=\"submitForm()\">";
		str+="</div>";

        return str;
    }

     /**
     * 表单提交按钮函数
     * @param {String} handler - 面板解析函数名
     */
     submitForm(url,method){
        // 获取表单元素
        let form = document.getElementById("myForm");
        
        // // 获取select元素和选中的option元素
        // let select = form.elements["form-control"];
        // let selectedOption = select.options[select.selectedIndex];
        
        // // 将表单数据格式化为URL编码字符串
         let data = new FormData(form);
        // data.append('selectedOption', selectedOption.value);
      
        // 创建XMLHttpRequest对象
        let xhr = new XMLHttpRequest();
          
        // 处理请求的回调函数
        xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 请求完成且响应成功，可以处理返回的数据
          console.log("提交成功");
          }
        };
          
            // 发送POST请求
        xhr.open(method, url, true);
        xhr.send(data);
      }
}