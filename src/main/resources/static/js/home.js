    $(document).ready(function () {
        // var menuData = LoadAjax({},"/menu/getMenuList",false);
        // console.log(JSON.stringify(menuData))
        var pages={};
        // prepare the data
        operater = (LoadAjaxJson({},"",
            "/getCurrentOperater").data)[0];
        initHome();
        var source =
            {
                datatype: "json",
                datafields: [
                    { name: "menuId" },
                    { name: "parentMenuId" },
                    // { name: "icon" },
                    { name: "menuName" },
                    { name: "value" },
                ],
                id: "menuId",
                url: "/menu/getMenuList",
                async: false
                // localdata:menuData
            };
        var dataAdapter = new $.jqx.dataAdapter(source);
        dataAdapter.dataBind();
        var records = dataAdapter.getRecordsHierarchy(
            "menuId", "parentMenuId", "items", [{ name: "menuName", map: "label"}]);
        $("#jqxTree").jqxTree({
            source: records,
            // width: 226, //宽度
            // height: 886, //高度
            theme: "Bootstrap"//主题样式
        });
        $("#jqxTree").jqxTree({allowDrag:false});
        $('#jqxTree').on('expand', function (event) {
            var args = event.args;
            var item = $("#jqxTree").jqxTree('getItem', args.element);
            if(item.value!==''&&operater.permission<getPermission(dataAdapter.recordids,value)){

            }
            console.log("expand");
        });
        $('#jqxTree').on('collapse', function (event) {
            var args = event.args;
            console.log("collapse");
        });
        $('#jqxTree').on('select', function (event) {
            // console.log(event.args);
            var item = $("#jqxTree").jqxTree('getItem', event.args.element);
            var value = item.value;
            if(value !== '') {
                // console.log("当前权限:"+operater.permission+" 所需权限:"+getPermission(dataAdapter.recordids,value))
                if(operater.permission<getPermission(dataAdapter.recordids,value)){
                    alert("您没有操作当前模块的权限！");
                    return;
                }
                var ii = layer.load();
                if(!RELOAD&&pages[value]!=undefined)
                    $(".content-wrapper").html(pages[value]);
                else
                    LoadAjaxContent(value);
                layer.close(ii);
            }
        });
        //设置默认选中的页面
        var items = $('#jqxTree').jqxTree("getItems");
        $('#jqxTree').jqxTree('selectItem', items[0]);
        //////////////////////////////////////////////////////////////////////////////////////
//
//          插件名称 : 动态更改 content-wrapper 页面内容片段
//          插件地址 :
//          插件名   :
//          插件版本 :
//
//////////////////////////////////////////////////////////////////////////////////////
        function LoadAjaxContent(url){
            $.ajax({
                type: 'GET',
                async: false,
                cache: false,
                mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
                url: url,
                dataType: "html"
            }).done(function(data, textStatus, jqXHR){
                var html = $(data);
                $(".content-wrapper").html(html);
                pages[url] = html;
            }).fail(function(jqXHR, textStatus, errorThrown){
                swal({
                    type: "error",
                    titleText: "错误",
                    html: "ReadyState: " + jqXHR.readyState + "<br> Status: " + jqXHR.status + "<br> StatusText: " + jqXHR.statusText,
                    confirmButtonText: "关闭"
                })
            });
        }
        function initHome() {
            console.log(JSON.stringify(operater))
            $("span.employee-name").text(operater.name);
            $("span.employee-permission").text(operater.permission+" 级");
            $("span.employee-id").text(operater.id);
            $("span.employee-position").text(operater.position);
        }
        function getPermission(data,value) {
            // console.log(data)
            for(var i=1;i<data.length;i++){
                if(data[i].value == value){
                    return parseInt(data[i].permission);
                }
            }
            return 1;
        }
    });
