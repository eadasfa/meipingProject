$(document).ready(function () {
    var url = "/goodsSetting/selling_log/operate";
    var sourceUrl = "/goodsSetting/getSellingLogs";
    var grid2Rows = [];//jqxGrid2的数据
    var width =window.document.body.offsetWidth*0.805;
    var height = window.document.body.offsetHeight*0.75
    if(goods.length==0)
        goods = LoadAjax({},"/goodsSetting/getGoods",false)
    if(operaters.length==0)
        operaters = LoadAjax({},"/systemSetting/getOperaters",false)
    if(members.length==0)
        members = LoadAjax({},"/memberManage/getMembers",false)
    var columns1=[
        { text: '销售时间', datafield: 'sellingTime', width: 160 },
        { text: '会员卡号', datafield: 'memberId', width: 60 },
        { text: '会员姓名', datafield: 'memberName', width: 100 },
        { text: '销售物品编号', datafield: 'goodId', width: 60 },
        { text: '物品名称', datafield: 'goodName', width: 120 },
        { text: '销售单价', datafield: 'sellingPrice', width: 80 },
        { text: '销售数量', datafield: 'number', width: 60 },
        { text: '销售总价', datafield: 'totalAmount', width: 100 },
        { text: '操作员编号', datafield: 'operaterId', width: 60 },
        { text: '操作员姓名', datafield: 'operaterName', width: 180 }
    ];
    setWidth(width,columns1)
    var columns2=[
        { text: '会员编号', datafield: 'memberId', width: 120 },
        { text: '会员姓名', datafield: 'memberName', width: 180 },
        { text: '花费总金额', datafield: 'totalAmount', width: 100 }
    ];
    setWidth(width,columns2)
    function initGrid() {
        var source =
            {
                datatype: "json",
                datafields:
                    [
                        { name: 'sellingTime'},
                        { name: 'memberId' },
                        { name: 'memberName' },
                        { name: 'goodId' },
                        { name: 'goodName' },
                        { name: 'sellingPrice' },
                        { name: 'number' },
                        { name: 'totalAmount' },
                        { name: 'operaterId' },
                        { name: 'operaterName' }
                    ],
                url: sourceUrl,
                async: false,
                addrow: function (rowid, rowdata, position, commit) {
                      commit(true);
                },
                deleterow: function (rowid, commit) {
                    commit(true);
                },
                updaterow: function (rowid, newdata, commit) {
                    // and with parameter false if the synchronization failed.
                    commit(true);
                }
            };
        var dataAdapter = new $.jqx.dataAdapter(source);
        // initialize jqxGrid
        $("#jqxGrid").jqxGrid({
            // width: getWidth('jqxGrid'),
            height: height,
            // autoheight: true,
            width:width,
            pageable: true,//设置可分页
            pagesize: 12,//设置默认页数
            pagesizeoptions: ['12', '24', '36'],//设置分页数
            altrows: true,//行间底色区分
            columnsresize: true,//列可适应调整
            sortable: true,//设置可排序
            showsortcolumnbackground: false,
            clipboard: false,//屏蔽jqx的复制功能
            enablebrowserselection: true,//允许使用浏览器选择内容功能
            source: dataAdapter,
            showtoolbar: true,
            ready:function(){
                //得到jqxGrid的数据,并进行处理
                grid2Rows = initGrid2Rows(dataAdapter.recordids);
            },
            rendertoolbar: function (toolbar) {
                $('#jqxGrid').jqxGrid({ toolbarheight: 40});
                var container = $("<div style='margin: 5px;'></div>");
                toolbar.append(container);
                container.append('开始时间<input type="text" id="from" placeholder="yyyy-MM-dd" style="width: 100px;">');
                container.append('结束时间<input type="text" id="to" placeholder="yyyy-MM-dd" style="width: 100px;">');
                container.append('会员卡号<input type="text" id="member-id" list="member-id-list" placeholder="会员卡号" style="width: 100px;">' +
                    '<datalist id="member-id-list"></datalist>');
                container.append('操作员编号<input type="text" id="operater-id" list="operater-id-list" placeholder="操作员编号" style="width: 100px;">' +
                    '<datalist id="operater-id-list"></datalist>');
                // container.append('商品编号<input type="text" id="good-id" list="good-id-list" placeholder="商品编号" style="width: 100px;">' +
                //     '<datalist id="good-id-list"></datalist>');
                container.append('<span><img style="margin-left:5px;" id = "search" alt="search" width="16" height="16" src="img/search.png" /></span>');
                layui.laydate.render({elem: '#from'}); //指定元素
                layui.laydate.render({elem: '#to'}); //指定元素
                //初始化搜索选择框
                for(var i=0;i<goods.length;i++){
                    $("#good-id-list").append('<option>'+goods[i].id+'</option>')
                }
                for(var i=0;i<operaters.length;i++){
                    $("#operater-id-list").append('<option>'+operaters[i].id+'</option>')
                }
                for(var i=0;i<members.length;i++){
                    $("#member-id-list").append('<option>'+members[i].id+'</option>')
                }
                $("#search").on('click', function () {
                    var row= {};
                    row['from'] = $("#from").val();
                    row['to'] = $("#to").val();
                    // row['goodId'] = $("#good-id").val();
                    row['goodId'] = "";
                    row['operaterId'] = $("#operater-id").val();
                    row['memberId'] = $("#member-id").val();
                    search(row);
                });
            },
            columns: columns1
        });
        $('#jqxGrid').jqxGrid('sortby', "buyingTime", 'des');
    }
    function initGrid2() {
        var source =
            {
                datatype: "json",
                datafields:
                    [
                        { name: 'memberId' },
                        { name: 'memberName' },
                        { name: 'totalAmount' }
                    ],
                localdata: grid2Rows,
                addrow: function (rowid, rowdata, position, commit) {commit(true);},
                deleterow: function (rowid, commit) {commit(true);},
                updaterow: function (rowid, newdata, commit) {commit(true);}
            };
        var dataAdapter = new $.jqx.dataAdapter(source);
        // initialize jqxGrid
        $("#jqxGrid2").jqxGrid({
            // width: getWidth('jqxGrid'),
            height: height,
            // autoheight: true,
            width:width,
            pageable: true,//设置可分页
            pagesize: 12,//设置默认页数
            pagesizeoptions: ['12', '24', '36'],//设置分页数
            altrows: true,//行间底色区分
            columnsresize: true,//列可适应调整
            clipboard: false,//屏蔽jqx的复制功能
            enablebrowserselection: true,//允许使用浏览器选择内容功能
            source: dataAdapter,
            showtoolbar: true,
            rendertoolbar: function (toolbar) {
                $('#jqxGrid2').jqxGrid({ toolbarheight: 40});
                var container = $("<div style='margin: 5px;'></div>");
                toolbar.append(container);
                container.append('开始时间<input type="text" id="from2" placeholder="yyyy-MM-dd" style="width: 100px;">');
                container.append('结束时间<input type="text" id="to2" placeholder="yyyy-MM-dd" style="width: 100px;">');
                container.append('会员卡号<input type="text" id="member-id2" list="member-id-list2" placeholder="会员卡号" style="width: 100px;">' +
                    '<datalist id="member-id-list2"></datalist>');
                container.append('操作员编号<input type="text" id="operater-id2" list="operater-id-list2" placeholder="操作员编号" style="width: 100px;">' +
                    '<datalist id="operater-id-list2"></datalist>');
                // container.append('商品编号<input type="text" id="good-id2" list="good-id-list2" placeholder="商品编号" style="width: 100px;">' +
                //     '<datalist id="good-id-list2"></datalist>');
                container.append('<span><img style="margin-left:5px;" id = "search2" alt="search" width="16" height="16" src="img/search.png" /></span>');
                layui.laydate.render({elem: '#from2'}); //指定元素
                layui.laydate.render({elem: '#to2'}); //指定元素
                //初始化搜索选择框
                for(var i=0;i<goods.length;i++){
                    $("#good-id-list2").append('<option>'+goods[i].id+'</option>')
                }
                for(var i=0;i<operaters.length;i++){
                    $("#operater-id-list2").append('<option>'+operaters[i].id+'</option>')
                }
                for(var i=0;i<members.length;i++){
                    $("#member-id-list2").append('<option>'+members[i].id+'</option>')
                }
                $("#search2").on('click', function () {
                    var row= {};
                    row['from'] = $("#from2").val();
                    row['to'] = $("#to2").val();
                    // row['goodId'] = $("#good-id2").val();
                    row['goodId'] = "";
                    row['operaterId'] = $("#operater-id2").val();
                    row['memberId'] = $("#member-id2").val();
                    search(row);
                });
            },
            columns: columns2
        });
    }
    // init widgets.
    var initWidgets = function (tab) {
        switch (tab) {
            case 0:
                initGrid();
                break;
            case 1:
                initGrid2();
                break;
        }
    }//width: getWidth('Tabs')
    $('#tabs').jqxTabs({
        width: width,
        height: height+100,
        initTabContent: initWidgets });
    $('#jqxGrid').jqxGrid('sortby', "sellingTime", 'des');
    function search(row) {

        if(row["from"]==undefined||row["from"]==""){
            row["from"] ="1970-01-01";
        }
        if(row["to"]==undefined||row["to"]==""){
            var myDate = new Date();//获取系统当前时间
            var day = myDate.getDate();
            day = day<10?("0"+day):day;
            var month = myDate.getMonth()+1;
            month = month<10?("0"+month):month;
            row['to'] = myDate.getFullYear()+"-"+month+"-"+day;
            console.log(row['to'])
        }
        if(row['goodId']!=undefined&&row['goodId']!=""){
            if(!isInteger(row['goodId'])) {
                alert("商品编号需要整数");return
            }
        }
        console.log(JSON.stringify(row))
        if(row['operaterId']!=undefined&&row['operaterId']!=""){
            if(!isInteger(row['operaterId'])) {
                alert("操作员编号需要整数");return
            }
        }
        if(row['memberId']!=undefined&&row['memberId']!=""){
            if(!isInteger(row['memberId'])) {
                alert("会员卡号需要整数");return
            }
        }
        var result = LoadAjaxJson(row,SEARCH,url);
        // console.log(result.data)
        $('#jqxGrid').jqxGrid('clear');
        $('#jqxGrid2').jqxGrid('clear');
        //  传入json数组[{},{}]
        showNoSort(result.data)
        showNoSortByGrid(initGrid2Rows(result.data),"jqxGrid2")
        var sortcolumn = $('#jqxGrid').jqxGrid('getsortcolumn');
        // console.log(sortcolumn)
        if(sortcolumn==null)
            sortcolumn = 'sellingTime';
        $('#jqxGrid').jqxGrid('sortby', sortcolumn, 'des');
    }
    function initGrid2Rows(rows) {
        var data = [];
        var isExist = {};
        // console.log(rows)
        for(var i=0;i<rows.length;i++){
            var row={};
            if(isExist[rows[i].memberId]==undefined){
                row['memberId'] = rows[i].memberId;
                row['memberName'] = rows[i].memberName;
                row['totalAmount'] = rows[i].totalAmount;
                isExist[rows[i].memberId] = row;
            }else{
                row = isExist[rows[i].memberId];
                row['totalAmount'] = row['totalAmount']+rows[i].totalAmount;
                isExist[rows[i].memberId] = row;
            }
        }
        // console.log(isExist)
        for(var key in isExist){
            // console.log(key)
            data.push(isExist[key]);
        }
        return data;
    }
});