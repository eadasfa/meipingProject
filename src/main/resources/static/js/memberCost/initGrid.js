var width=window.document.body.offsetWidth*0.82;
var height=330;
function initGrid1() {
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
    var jqxGrid = "jqxGrid1";
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
            localdata:[],
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
    $("#"+jqxGrid).jqxGrid({
        height: height,
        width:width,
        altrows: true,//行间底色区分
        columnsresize: true,//列可适应调整
        sortable: true,//设置可排序
        showsortcolumnbackground: false,
        source: dataAdapter,
        showtoolbar: false,
        // rendertoolbar: function (toolbar) {
        //     $("#"+jqxGrid).jqxGrid({ toolbarheight: 40});
        //     var container = $("<div style='margin: 5px;'></div>");
        //     toolbar.append(container);
        //     container.append('<input id="addSpend" type="text" value="增加消费"/>');
        //     $("#addSpend").jqxButton();
        //     $("#addSpend").on('click',function () {
        //         addSpend();
        //     });
        // },
        columns: columns1
    });
}
function initGrid2() {
    var columns1=[
        { text: '兑换时间', datafield: 'sellingTime', width: 160 },
        { text: '会员卡号', datafield: 'memberId', width: 60 },
        { text: '会员姓名', datafield: 'memberName', width: 100 },
        { text: '兑换物品编号', datafield: 'goodId', width: 60 },
        { text: '物品名称', datafield: 'goodName', width: 120 },
        { text: '所需积分', datafield: 'credit', width: 80 },
        { text: '兑换数量', datafield: 'number', width: 60 },
        { text: '积分总量', datafield: 'totalAmount', width: 100 },
        { text: '操作员编号', datafield: 'operaterId', width: 60 },
        { text: '操作员姓名', datafield: 'operaterName', width: 180 }
    ];
    var jqxGrid = "jqxGrid2";
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
                    { name: 'credit' },
                    { name: 'number' },
                    { name: 'totalAmount' },
                    { name: 'operaterId' },
                    { name: 'operaterName' }
                ],
            localdata:[],
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
    $("#"+jqxGrid).jqxGrid({
        height: height,
        width:width,
        altrows: true,//行间底色区分
        columnsresize: true,//列可适应调整
        sortable: true,//设置可排序
        showsortcolumnbackground: false,
        source: dataAdapter,
        showtoolbar: false,
        columns: columns1
    });
}
function initGrid3() {
    var columns1=[
        { text: '租用日期', datafield: 'startTime', width: 100 },
        { text: '结束日期', datafield: 'endTime', width: 100 },
        { text: '总金额', datafield: 'totalAmount', width: 100 },
        { text: '教练名称', datafield: 'trainerName', width: 100 },
        { text: '操作员编号', datafield: 'operaterId', width: 50 },
        { text: '操作员姓名', datafield: 'operaterName', width: 100 }
    ];
    var jqxGrid = "jqxGrid3";
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'startTime' },
                    { name: 'endTime' },
                    { name: 'totalAmount' },
                    { name: 'trainerName'},
                    { name: 'operaterId' },
                    { name: 'operaterName' }

                ],
            localdata:[],
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
    $("#"+jqxGrid).jqxGrid({
        height: height,
        width:width,
        altrows: true,//行间底色区分
        columnsresize: true,//列可适应调整
        sortable: true,//设置可排序
        showsortcolumnbackground: false,
        source: dataAdapter,
        showtoolbar: false,
        columns: columns1
    });
}
function initGrid4() {
    var columns1=[
        { text: '交费日期', datafield: 'startTime', width: 180 },
        { text: '会员卡号', datafield: 'memberId', width: 120 },
        { text: '会员姓名', datafield: 'memberName', width: 180 },
        { text: '交费金额', datafield: 'account', width: 100 },
        { text: '会员类型', datafield: 'cardTypeName', width: 100 },
        { text: '操作员编号', datafield: 'operaterId', width: 150 },
        { text: '操作员名称', datafield: 'operaterName', width: 150 },
    ];
    var jqxGrid = "jqxGrid4";
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'startTime'},
                    { name: 'memberId' },
                    { name: 'memberName' },
                    { name: 'account' },
                    { name: 'cardTypeName' },
                    { name: 'operaterId' },
                    { name: 'operaterName' }
                ],
            localdata:[],
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
    $("#"+jqxGrid).jqxGrid({
        height: height,
        width:width,
        altrows: true,//行间底色区分
        columnsresize: true,//列可适应调整
        sortable: true,//设置可排序
        showsortcolumnbackground: false,
        source: dataAdapter,
        showtoolbar: false,
        columns: columns1
    });
}
function initGrid5() {
    var columns1=[
        { text: '操作时间', datafield: 'operateTime', width: 100 },
        { text: '会员卡号', datafield: 'memberId', width: 80 },
        { text: '会员姓名', datafield: 'memberName', width: 100 },
        { text: '衣柜编号', datafield: 'wardrobeId', width: 80 },
        { text: '开始时间', datafield: 'startTime', width: 100 },
        { text: '到期时间', datafield: 'endTime', width: 100 },
        { text: '总金额', datafield: 'totalAmount', width: 80 },
        { text: '操作员编号', datafield: 'operaterId', width: 100 },
        { text: '操作员姓名', datafield: 'operaterName', width: 100 },
        { text: '备注', datafield: 'context', width: 180 }
    ];
    var jqxGrid = "jqxGrid5";
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'operateTime' },
                    { name: 'memberId' },
                    { name: 'memberName' },
                    { name: 'wardrobeId' },
                    { name: 'startTime' },
                    { name: 'endTime' },
                    { name: 'totalAmount'},
                    { name: 'operaterId' },
                    { name: 'operaterName' },
                    { name: 'context' }
                ],
            localdata:[],
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
    $("#"+jqxGrid).jqxGrid({
        height: height,
        width:width,
        altrows: true,//行间底色区分
        columnsresize: true,//列可适应调整
        sortable: true,//设置可排序
        showsortcolumnbackground: false,
        source: dataAdapter,
        showtoolbar: false,
        columns: columns1
    });
}
var grid={
    "1":{"operate":SEARCH,'url':"/goodsSetting/selling_log/operate",'sortby':'sellingTime'},
    "2":{"operate":SEARCH_SELLING_LOG,'url':"/goodsSetting/selling_log/operate",'sortby':'sellingTime'},
    "3":{"operate":SEARCH_TRAINER_LOG,'url':"/memberManage/trainer/operate",'sortby':'startTime'},
    "4":{"operate":SEARCH,'url':"/memberManage/member_pay_log/operate",'sortby':'startTime'},
    "5":{"operate":SEARCH_WARDROBE_LOG,'url':"/systemSetting/wardrobe/operate",'sortby':'operateTime'},
}
function setJqxRow(gridId,memberId){
    var jqxGrid = "jqxGrid"+gridId;
    var row={};
    row["from"] ="1970-01-01";
    row['to'] = "2100-01-01";
    if(memberId==undefined)
        row['memberId'] = $("#id").text();
    else row.memberId=memberId;
    if(gridId==2) row.type=1;
    var result = LoadAjaxJson(row,grid[gridId+""].operate,grid[gridId+""].url);
    $('#'+jqxGrid).jqxGrid('clear');
    showNoSortByGrid(result.data,jqxGrid)
    var sortcolumn = $('#'+jqxGrid).jqxGrid('getsortcolumn');
    // console.log(sortcolumn)
    if(sortcolumn==null)
        sortcolumn = grid[gridId+""].sortby;
    $('#'+jqxGrid).jqxGrid('sortby', sortcolumn, 'des');
}
function setJqx1Row(id) {
    var jqxGrid = "jqxGrid1"
    var row={};
    row["from"] ="1970-01-01";
    row['to'] = "2100-01-01";
    if(id==undefined)
        row['memberId'] = $("#id").text();
    else row.memberId=id;
    var result = LoadAjaxJson(row,SEARCH,"/goodsSetting/selling_log/operate");
    // console.log(result.data)
    $('#'+jqxGrid).jqxGrid('clear');
    showNoSortByGrid(result.data,jqxGrid)
    var sortcolumn = $('#'+jqxGrid).jqxGrid('getsortcolumn');
    // console.log(sortcolumn)
    if(sortcolumn==null)
        sortcolumn = 'sellingTime';
    $('#'+jqxGrid).jqxGrid('sortby', sortcolumn, 'des');
}
function setJqx2Row(id) {
    var jqxGrid="jqxGrid2"
    var row={};
    row["from"] ="1970-01-01";
    row['to'] = "2100-01-01";
    row['type'] = 1;
    if(id==undefined)
        row['memberId'] = $("#id").text();
    else row.memberId=id;
    var result = LoadAjaxJson(row,SEARCH_SELLING_LOG,"/goodsSetting/selling_log/operate");
    // console.log(result.data)
    $('#'+jqxGrid).jqxGrid('clear');
    showNoSortByGrid(result.data,jqxGrid)
    var sortcolumn = $('#'+jqxGrid).jqxGrid('getsortcolumn');
    // console.log(sortcolumn)
    if(sortcolumn==null)
        sortcolumn = 'sellingTime';
    $('#'+jqxGrid).jqxGrid('sortby', sortcolumn, 'des');
}
function setJqx3Row(id) {
    var jqxGrid="jqxGrid3"
    var memberId;
    if(id==undefined)
        memberId = $("#id").text();
    else memberId=id;
    var result = LoadAjaxJson({"memberId":memberId},SEARCH_TRAINER_LOG,"/memberManage/trainer/operate");
    $("#"+jqxGrid).jqxGrid('clear');
    // console.log(result)
    showNoSortByGrid(result.data,jqxGrid)
    var sortcolumn = $('#'+jqxGrid).jqxGrid('getsortcolumn');
    // console.log(sortcolumn)
    if(sortcolumn==null)
        sortcolumn = 'startTime';
    $('#'+jqxGrid).jqxGrid('sortby', sortcolumn, 'des');
}
function setJqx4Row(id) {
    var jqxGrid="jqxGrid4"
    var row={};
    row["from"] ="1970-01-01";
    row['to'] = "2100-01-01";
    if(id==undefined)
        row['memberId'] = $("#id").text();
    else row.memberId=id;
    var result = LoadAjaxJson(row,SEARCH,"/memberManage/member_pay_log/operate");
    $('#'+jqxGrid).jqxGrid('clear');
    showNoSortByGrid(result.data,jqxGrid)
    var sortcolumn = $('#'+jqxGrid).jqxGrid('getsortcolumn');
    // console.log(sortcolumn)
    if(sortcolumn==null)
        sortcolumn = 'startTime';
    $('#'+jqxGrid).jqxGrid('sortby', sortcolumn, 'des');
}
function setJqx5Row(id) {
    var jqxGrid="jqxGrid5"
    var row={};
    row["from"] ="1970-01-01";
    row['to'] = "2100-01-01";
    if(id==undefined)
        row['memberId'] = $("#id").text();
    else row.memberId=id;
    var result = LoadAjaxJson(row,SEARCH_WARDROBE_LOG,"/systemSetting/wardrobe/operate");
    $('#'+jqxGrid).jqxGrid('clear');
    showNoSortByGrid(result.data,jqxGrid)
    var sortcolumn = $('#'+jqxGrid).jqxGrid('getsortcolumn');
    // console.log(sortcolumn)
    if(sortcolumn==null)
        sortcolumn = 'operateTime';
    $('#'+jqxGrid).jqxGrid('sortby', sortcolumn, 'des');
}

function initGrid() {
    initGrid1()
    initGrid2()
    initGrid3()
    initGrid4()
    initGrid5()
}

function setAllJqxGridRow(id) {
    // for(var i=1;i<=5;i++){
//     setJqxRow(i,2)
// }
    if(id=="") return;
    setJqx1Row(id);
    setJqx2Row(id);
    setJqx3Row(id);
    setJqx4Row(id);
    setJqx5Row(id);
}
var goodLeft={};