$(function () {
    $(".screenshot").click(function () {
        var $button = $(this);
        var screenshotDom = $button.next("table");
        screenshot(screenshotDom[0]);
    });
});

/**
 * 截图
 * @param dom 需要进行截图的dom
 */
function screenshot(dom) {
    html2canvas(dom, {
        useCORS: true, // 【重要】开启跨域配置
        onrendered: function (canvas) {
            var saveImage = canvas.toDataURL("image/jpg");
            var saveLink = document.createElement('a');
            saveLink.href = saveImage;
            saveLink.download = 'downLoad.jpg';
            saveLink.click();
        }
    });
}