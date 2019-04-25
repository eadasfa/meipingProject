$(document).ready(function () {
    var goodUrl = "/goodsSetting/good/operate";
    var goodBuyingLogurl = "/goodsSetting/buying_log/operate";
    var sourceUrl = "/goodsSetting/getGoods";
    var grid2Rows = [];//jqxGrid2的数据
    var width =window.document.body.offsetWidth*0.805/2;
    var height = window.document.body.offsetHeight*0.805
    if(goods.length==0)
        goods = LoadAjax({},"/goodsSetting/getGoods",false)
    var columns1=[
        { text: '商品编号', datafield: 'id', width: 100 },
        { text: '商品名称', datafield: 'name', width: 180 },
        { text: '商品库存', datafield: 'leftNumber', width: 160 },
        { text: '参考进价', datafield: 'buyingPrice', width: 100 }
    ];
    var columns2=[
        { text: '物品编号', datafield: 'id', width: 100 },
        { text: '物品名称', datafield: 'name', width: 148 },
        { text: '进货单价', datafield: 'buyingPrice', width: 100 },
        { text: '进货数量', datafield: 'number', width: 100 },
        { text: '总金额', datafield: 'totalAmount', width: 100 }
    ];
    function initGrid() {
        var source =
            {
                datatype: "json",
                datafields:
                    [
                        { name: 'id' },
                        { name: 'name' },
                        { name: 'leftNumber' },
                        { name: 'buyingPrice' }
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
                goods = dataAdapter.recordids;
            },
            rendertoolbar: function (toolbar) {
                $('#jqxGrid').jqxGrid({ toolbarheight: 40});
                var container = $("<div style='margin: 5px;'></div>");
                toolbar.append(container);
                container.append('输入商品编号查询商品：<input type="text" id="good-id" list="good-id-list" placeholder="商品编号" style="width: 100px;">' +
                    '<datalist id="good-id-list"></datalist>');
                container.append('<input id="search"  style="margin-left: 10px" type="button" value="加入所选商品" />');
                $("#search").jqxButton();
                //初始化搜索选择框
                for(var i=0;i<goods.length;i++){
                    $("#good-id-list").append('<option>'+goods[i].id+'</option>')
                }
                $("#search").on('click', function () {
                    var goodId = $("#good-id").val();
                    search(goodId);
                });
            },
            columns: columns1
        });
        $('#jqxGrid').jqxGrid('sortby', "buyingTime", 'asc');
        $('#jqxGrid').on('rowdoubleclick', function (event) {
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            var data = $('#jqxGrid').jqxGrid('getrowdata', boundIndex);
            var id = $('#jqxGrid').jqxGrid('getrowid', boundIndex);
            Operate(ADD,data);

        });
    }
    function initGrid2() {
        var source =
            {
                datatype: "json",
                datafields:
                    [
                        { name: 'id' },
                        { name: 'name' },
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
                container.append('<input id="addrowbutton" type="button" value="确认进货" />');
                container.append('<input style="margin-left: 10px;" id="updaterowbutton" type="button" value="修改" />');
                container.append('<input style="margin-left: 10px;" id="deleterowbutton" type="button" value="删除" />');
                $("#addrowbutton").jqxButton();
                $("#deleterowbutton").jqxButton();
                $("#updaterowbutton").jqxButton();
                $("#updaterowbutton").on('click', function () {
                    Operate(UPDATE);
                });
                // create new row.
                $("#addrowbutton").on('click', function () {
                    checkIn();//进货
                });
                // delete row.
                $("#deleterowbutton").on('click', function () {
                    Operate(DELETE);
                });
            },
            columns: columns2
        });
        $('#jqxGrid2').on('rowdoubleclick', function (event) {
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            var data = $('#jqxGrid2').jqxGrid('getrowdata', boundIndex);
            var id = $('#jqxGrid2').jqxGrid('getrowid', boundIndex);
            Operate(UPDATE);
        });
    }
    initGrid();
    initGrid2();
    function checkIn() {
        var r = confirm("确认进货？");
        if(!r) return ;
        var rows = $('#jqxGrid2').jqxGrid('getrows');
        var row = {};
        for(var i=0;i<rows.length;i++){
            row['goodId'] = rows[i].id;
            row['buyingPrice'] = rows[i].buyingPrice;
            row['number'] = rows[i].number;
            row['operaterId'] = operater.id;
            LoadAjaxJson(row,CHECK_IN,goodBuyingLogurl);
        }
        $('#jqxGrid2').jqxGrid('clear');
        alert("进货成功！");
        search();

    }
//根据不同operateId弹出不同的窗口
    function Operate(operateId,row) {
        var title="进货";
        if(operateId==DELETE){
            if(isSelectedAItemByGrid("jqxGrid2")) deleteItem();
            else alert("请先选中要删除的记录！")
            return;
        }
        if(operateId==UPDATE){
            if(!isSelectedAItemByGrid("jqxGrid2")){
                alert("请先选中要更新的记录！")
                return;
            }
            row = getSelectRowByGrid("jqxGrid2").rowdata
            title = "修改员工信息";
        }
        var ii = layer.open({
            async:false,
            title:title,
            content: $('.popUpWindow').html(),
            area: ['400', '300px'],//自定义文本域宽高,
            btn: ['确定', '取消'],
            yes: function(index){
                //操作成功的标志
                var flag=true;
                if(operateId==ADD)
                    flag = addItem();
                else if(operateId == UPDATE)
                    flag = updateItem();
                //最后关闭弹出层
                if(flag)
                    layer.close(index);
            },
            btn2: function() {
                //按钮【取消】的回调
                return 0;
            },
            success: function(layero, index){
                //初始化页面
                initChildWindowBeforeOpen(operateId,row);
                $("#number,#buyingPrice").keyup(function () {
                    $("#totalAmount").val($("#buyingPrice").val()*$("#number").val());
                })
            }
        });
    }
    function initChildWindowBeforeOpen(operateId,row) {

        $("#id").val(row.id);
        $("#name").val(row.name);
        $("#leftNumber").val(row.leftNumber);
        $("#refrencePrice").val(row.buyingPrice);
        $("#buyingPrice").val(row.buyingPrice);
        $("#number").val(1);
        $("#totalAmount").val(1*row.buyingPrice);

    }
    function addItem() {
        var row = generateRow();
        if(row==false) return false;
        var commit = $("#jqxGrid2").jqxGrid('addrow', null, row);
        return true;
    }
    function updateItem() {
        var row = generateRow();
        if(row==false) return false;
        var id = getSelectedId();
        var commit = $("#jqxGrid2").jqxGrid('updaterow', id, row);
        return true;
    }
    function deleteItem() {
        var id = getSelectedId();
        var commit = $("#jqxGrid2").jqxGrid('deleterow', id);
        return true;
    }
    function generateRow() {
        var row = {};
        row.id = $("#id").val();
        row.name = $("#name").val();
        row.buyingPrice = $("#buyingPrice").val();
        row.number = $("#number").val();
        row.totalAmount = $("#totalAmount").val();
        if(!isInteger(row.number)){
            alert("数量应为整数");return false;
        }
        if(!isDecimal(row.buyingPrice)){
            alert("单价应为数字");return false;
        }
        return row;
    }
    function getSelectedId() {
        var selectedrowindex = $("#jqxGrid2").jqxGrid('getselectedrowindex');
        var rowscount = $("#jqxGrid2").jqxGrid('getdatainformation').rowscount;
        if (!(selectedrowindex >= 0 && selectedrowindex < rowscount))
            return false;
        var id = $("#jqxGrid2").jqxGrid('getrowid', selectedrowindex);
        return id;
    }
    function search(goodId) {

        var row = {};
        row.key = 'id';
        if(goodId!=undefined&&goodId!=""){
            if(!isInteger(goodId)) {
                alert("商品编号需要整数");return
            }
            row['value'] = goodId;
        }
        var result = LoadAjaxJson(row,SEARCH,goodUrl);
        // console.log(result.data)
        $('#jqxGrid').jqxGrid('clear');
        if(row['value']==undefined)
            goods = result.data;
        //  传入json数组[{},{}]
        show(result.data)
    }
   
});