// Chart.js scripts
// -- 设置新的默认字体族和字体颜色来模仿Bootstrap的默认样式
Chart.defaults.global.defaultFontFamily =
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#292b2c";

//翻页，改变每页显示数据数量，过滤，排序，页脚信息，自动宽度
$(document).ready(function () {
  $("#dataTable").DataTable();
});

// IIFE（立即调用函数表达式）
(function ($) {
  "use strict"; // Start of use strict
  // 配置折叠侧边导航的工具提示
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template:
      '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
  });
  
  // 切换侧边导航
  $("#sidenavToggler").click(function (e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(
      ".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level"
    ).removeClass("show");
  });

  // 当单击可折叠导航链接时，强制删除已切换的类
  $(".navbar-sidenav .nav-link-collapse").click(function (e) {
    e.preventDefault();
    $("body").removeClass("sidenav-toggled");
  });
  // 防止内容包装器在固定边导航栏悬停时滚动
  $(
    "body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse"
  ).on("mousewheel DOMMouseScroll", function (e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });
  // 滚动到顶部按钮出现
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });
  // 全局配置工具提示
  $('[data-toggle="tooltip"]').tooltip();
  // 使用jQuery平滑滚动
  $(document).on("click", "a.scroll-to-top", function (event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1000,
        "easeInOutExpo"
      );
    event.preventDefault();
  });
})(jQuery); // End of use strict


