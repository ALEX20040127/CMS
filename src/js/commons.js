
/**
 * 指定的对象中显示错误提示
 * @param {Object} obj - 显示错误的对象 
 * @param {String} tips - 显示错误提示
 */
function displayErrors(obj,tips){
    let objError=document.createElement("div");
    objError.innerHTML=tips;
    objError.className='error'
    obj.appendChild(objError);
}

function checkImagePath(imgSrc) {
  let http = new XMLHttpRequest();
  http.open('HEAD', imgSrc, false);
  http.send();
  if (http.status == 404) {
    imgSrc = 'static/images/default.jpg';
  }
  return imgSrc;
}


/**
 * 将组装好的HTML添加到指定的对象容器中
 * @param {String} strHtml - 需要生成的html
 */
function addHtmlIntoDoc(obj,strHtml){
    
    if(!strHtml || strHtml===""){
        displayErrors(objContainer,ERRORS.panelError);
    }else{
        try{
            $(obj).append(strHtml);
        }catch(e){
            displayErrors(obj,e);
        }
    }
}


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
