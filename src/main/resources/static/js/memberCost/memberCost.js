$(document).ready(function () {
    //初始化输入面板
    init();
    // init widgets.
    var initWidgets = function (tab) {
        switch (tab) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
    }//width: getWidth('Tabs')
    $('#tabs').jqxTabs({
        width: width,
        height: height,
        initTabContent: initWidgets
    });
});