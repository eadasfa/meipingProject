$(document).ready(function () {
    var url = "/goodsSetting/buying_log/operate";
    var sourceUrl = "/goodsSetting/getBuyingLogs";
    var grid2Rows = [];//jqxGrid2的数据
    var width =window.document.body.offsetWidth*0.805;
    var height = window.document.body.offsetHeight*0.75
    if(goods.length==0)
        goods = LoadAjax({},"/goodsSetting/getGoods",false)
    if(operaters.length==0)
        operaters = LoadAjax({},"/systemSetting/getOperaters",false)
    var columns1=[
        { text: '进货时间', datafield: 'buyingTime', width: 200 },
        { text: '进货物品编号', datafield: 'goodId', width: 120 },
        { text: '货物名称', datafield: 'goodName', width: 180 },
        { text: '进货单价', datafield: 'buyingPrice', width: 100 },
        { text: '进货数量', datafield: 'number', width: 100 },
        { text: '进货总价', datafield: 'totalAmount', width: 100 },
        { text: '操作员编号', datafield: 'operaterId', width: 80 },
        { text: '操作员姓名', datafield: 'operaterName', width: 180 }
    ];
    setWidth(width,columns1);
    var columns2=[
        { text: '进货物品编号', datafield: 'goodId', width: 120 },
        { text: '货物名称', datafield: 'goodName', width: 180 },
        { text: '进货单价', datafield: 'buyingPrice', width: 100 },
        { text: '进货总数量', datafield: 'number', width: 100 },
        { text: '进货总金额', datafield: 'totalAmount', width: 100 }
    ];
    setWidth(width,columns2);
    function initGrid() {
        var source =
            {
                datatype: "json",
                datafields:
                    [
                        { name: 'buyingTime' },
                        { name: 'goodId' },
                        { name: 'goodName' },
                        { name: 'buyingPrice' },
                        { name: 'number' },
                        { name: 'totalAmount' },
                        { name: 'operaterId' },
                        { name: 'operaterName' }
                    ],
                url: sourceUrl,
                async: false,
                addrow: function (rowid, rowdata, position, commit) {
                    // synchronize with the server - send insert command
                    // call commit with parameter true if the synchronization with the server is successful
                    //and with parameter false if the synchronization failed.
                    // you can pass additional argument to the commit callback which represents the new ID if it is generated from a DB.
                    commit(true);
                },
                deleterow: function (rowid, commit) {
                    // synchronize with the server - send delete command
                    // call commit with parameter true if the synchronization with the server is successful
                    //and with parameter false if the synchronization failed.
                    commit(true);
                },
                updaterow: function (rowid, newdata, commit) {
                    // synchronize with the server - send update command
                    // call commit with parameter true if the synchronization with the server is successful
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
                container.append('商品编号<input type="text" id="good-id" list="good-id-list" placeholder="商品编号" style="width: 100px;">' +
                    '<datalist id="good-id-list"></datalist>');
                container.append('操作员编号<input type="text" id="operater-id" list="operater-id-list" placeholder="操作员编号" style="width: 100px;">' +
                    '<datalist id="operater-id-list"></datalist>');
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
                $("#search").on('click', function () {
                    var from = $("#from").val();
                    var to = $("#to").val();
                    var goodId = $("#good-id").val();
                    var operaterId = $("#operater-id").val();
                    search(from,to,goodId,operaterId);
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
                        { name: 'goodId' },
                        { name: 'goodName' },
                        { name: 'buyingPrice' },
                        { name: 'number' },
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
            sortable: true,//设置可排序
            showsortcolumnbackground: false,
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
                container.append('商品编号<input type="text" id="good-id2" list="good-id-list2" placeholder="商品编号" style="width: 100px;">' +
                    '<datalist id="good-id-list2"></datalist>');
                container.append('操作员编号<input type="text" id="operater-id2" list="operater-id-list2" placeholder="操作员编号" style="width: 100px;">' +
                    '<datalist id="operater-id-list2"></datalist>');
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
                $("#search2").on('click', function () {
                    var from = $("#from2").val();
                    var to = $("#to2").val();
                    var goodId = $("#good-id2").val();
                    var operaterId = $("#operater-id2").val();
                    search(from,to,goodId,operaterId);
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
    $('#jqxGrid').jqxGrid('sortby', "buyingTime", 'des');
    function search(from,to,goodId,operaterId) {
        if(from==undefined||from==""){
            from ="1970-01-01";
        }
        if(to==undefined||to==""){
            var myDate = new Date();//获取系统当前时间
            var day = myDate.getDate();
            day = day<10?("0"+day):day;
            var month = myDate.getMonth()+1;
            month = month<10?("0"+month):month;
            to = myDate.getFullYear()+"-"+month+"-"+day;
            // console.log(to)
        }
        var row={};
        row['from'] = from;
        row['to'] = to
        if(goodId!=undefined&&goodId!=""){
            if(!isInteger(goodId)) {
                alert("商品编号需要整数");return
            }
            row['goodId'] = goodId;
        }
        if(operaterId!=undefined&&operaterId!=""){
            if(!isInteger(operaterId)) {
                alert("操作员编号需要整数");return
            }
            row['operaterId'] = operaterId;
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
            sortcolumn = 'buyingTime';
        $('#jqxGrid').jqxGrid('sortby', sortcolumn, 'des');
    }
    function initGrid2Rows(rows) {
        var data = [];
        var isExist = {};
        // console.log(rows)
        for(var i=0;i<rows.length;i++){
            var row={};
            if(isExist[rows[i].goodId]==undefined){
                row['goodId'] = rows[i].goodId;
                row['goodName'] = rows[i].goodName;
                row['buyingPrice'] = rows[i].buyingPrice;
                row['number'] = rows[i].number;
                row['totalAmount'] = rows[i].totalAmount;
                isExist[rows[i].goodId] = row;
            }else{
                row = isExist[rows[i].goodId];
                row['number'] = row['number'] + rows[i].number;
                row['totalAmount'] = row['totalAmount']+rows[i].totalAmount;
                isExist[rows[i].goodId] = row;
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