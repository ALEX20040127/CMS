class courseComponent{
     /**
     * 课程详情组件的构造器
     * @param {Object} courseComponent
     */
     constructor(COURSE_SETTINGS){
        this.courseSettings=COURSE_SETTINGS;
    }

    /**
     * 生成课程详情
     */
    appendcourseHTML(data){
        let courseHTML = '<div class="col">';
        courseHTML+=this.makeHeaderHTML(data[0]);
        // courseHTML+=this.makeBodyHTML();  
        courseHTML+="</div>";

        return courseHTML;
    }

    /**
     * 生成课程详情头部 分为图片和右边详情
     */
    makeHeaderHTML(data){
        let str = "";
        str += '<div class="course-header">';
        str += '<div class="row align-items-center">';
        //图像
        str += '<div class="col-auto course-image">';
        str += '<a href="#">';
        str +=
          '<img height=200 width=200 alt="User Image" src="static/images/3_'+data.course_id+'.jpg">';
        str += "</a>";
        str += "</div>";
        //课程信息
        str+='<div class="row-0">';
        str += '<div class="row">';
        str +='<p class="col-sm-3">' +this.courseSettings.course_id +"</p>";
        str += '<p class="col-sm-9">' + data.course_id + "</p>";
        str +='<p class="col-sm-3">' +this.courseSettings.course_name +"</p>";
        str += '<p class="col-sm-9">' + data.course_name + "</p>";
        str +='<p class="col-sm-3">' +this.courseSettings.teacher_id +"</p>";
        str += '<p class="col-sm-9">' + data.teacher_id + "</p>";
        str +='<p class="col-sm-3">' +this.courseSettings.course_describe +"</p>";
        str += '<p class="col-sm-9">' + data.course_describe + "</p>";
        str +='<p class="col-sm-3">' +this.courseSettings.credit +"</p>";
        str += '<p class="col-sm-9">' + data.credit + "</p>";
        str += "</div>";
        
        str+="</div>";
        str += "</div></div>";
        return str;
    }
    /**
     * 生成课程详情目录
     */
    // makeBodyHTML(){
    //     let str="";

    //     str+="<ul class=\"course-body\">";
    //     str+="<h5>目录</h5>";
    //     str+="<li>教师团队</li>";
    //     str+="<li>课程章节</li>";
    //     str+="<li>教学方法</li>";
    //     str+="<li>教材</li>";
    //     str+="<li>参考教材</li>";
    //     str+="</ul>";

    //     return str;
    // }


}