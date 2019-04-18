$(document).ready(function () {
    var url = "/systemSetting/wardrobe/operate";
    var sourceUrl = "/systemSetting/getWardrobes";
    var columns=[
        { text: '衣柜编号', datafield: 'id', width: 200 },
        { text: '衣柜名称', datafield: 'name', width: 200 },
        { text: '衣柜状态', datafield: 'status', width: 180 }
    ];
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'id' },
                    { name: 'name' },
                    { name: 'status' },
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
            height: window.document.body.offsetHeight*0.805,
            // autoheight: true,
            width:window.document.body.offsetWidth*0.805,
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
            //这里的返回值需要根绝实际情况作调整。
            // 如果params.data获取不到。可以用dataadapter来获取
            // 如dataadapter.recordids[0].*等
            ready:function(){//将0，1，2 映射
                var map = {'0':"空闲",'1':"已租",'2':"损坏"}
                var data = dataAdapter.recordids;
                for(var i=0;i<data.length;i++){
                     var commit = $("#jqxGrid").jqxGrid('updaterow', i, changeData(data[i]));
                }
            },
            rendertoolbar: function (toolbar) {
                //console.log(dataAdapter.recordids[0].name)
                //   var data = dataAdapter.recordids;
                //   console.log(data[0].name)
                //   var me = this;
                setToolBar();
                var container = $("<div style='margin: 5px;'></div>");
                toolbar.append(container);
                container.append('<input id="addrowbutton" type="button" value="增加" />');
                container.append('<input style="margin-left: 10px;" id="addrowmanybutton" type="button" value="批量添加" />');
                container.append('<input style="margin-left: 10px;" id="updaterowbutton" type="button" value="修改" />');
                container.append('<input style="margin-left: 10px;" id="deleterowbutton" type="button" value="删除" />');
                container.append('<select style="margin-left: 15px;" id="searchkey"></select>');
                container.append('<input style="margin-left: 10px; width: 80px" id="searchvalue" list="none"/>' +
                    '<datalist id="inputlist"><option>空闲</option><option>已租</option><option>损坏</option></datalist>');
                container.append('<span><img style="margin-left:5px;" id = "search" alt="search" width="16" height="16" src="img/search.png" /></span>');
                $("#addrowbutton").jqxButton();
                $("#addrowmanybutton").jqxButton();
                $("#deleterowbutton").jqxButton();
                $("#updaterowbutton").jqxButton();

                for(var i=0;i<columns.length;i++){
                    var temp = columns[i];
                    $("#searchkey").append('<option value='+temp.datafield+'>'+temp.text+'</option>')
                }
                // update row.
                $("#updaterowbutton").on('click', function () {
                    Operate(UPDATE);
                });
                // create new row.
                $("#addrowbutton").on('click', function () {
                    Operate(ADD);
                });
                $("#addrowmanybutton").on('click', function () {
                    Operate(ADDMANY);
                });
                // delete row.
                $("#deleterowbutton").on('click', function () {
                    Operate(DELETE);
                });
                $("#search").on('click', function () {
                    var key = $("#searchkey").val();
                    var value = $("#searchvalue").val();
                    search(key,value);
                });
                $("#searchkey").change(function () {
                    if($(this).val()=="status")
                        $("#searchvalue").attr("list","inputlist");
                    else $("#searchvalue").attr("list","none");
                });
            },
            columns: columns
        });
    $('#jqxGrid').on('rowdoubleclick', function (event) {
        var args = event.args;
        // row's bound index.
        var boundIndex = args.rowindex;
        var data = $('#jqxGrid').jqxGrid('getrowdata', boundIndex);
        var id = $('#jqxGrid').jqxGrid('getrowid', boundIndex);
        Operate(UPDATE);
    });
    //根据不同operateId弹出不同的窗口
    function Operate(operateId) {
        var title = "添加衣柜";
        if(operateId==DELETE){
            if(isSelectedAItem()) deleteItem(url);
            else alert("请先选中要删除的记录！")
            return;
        }
        if(operateId==UPDATE){
            if(!isSelectedAItem()){
                alert("请先选中要更新的记录！")
                return;
            }
            title = "修改衣柜信息";
        }
        var ii = layer.open({
            async:false,
            title: title,
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
                else if(operateId == ADDMANY)
                    flag = addManyItem();
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
                initChildWindowBeforeOpen(operateId);
            }
        });
    }

    function initChildWindowBeforeOpen(operateId){
        if(operateId==UPDATE){
            var row = getSelectRow().rowdata;
            console.log(row)
            //初始化弹出表单
            $("#id").val(row['id']);
            $("#name").val(row['name']);
            $("#status").val(row['status']);
            $("#id").attr("disabled","disabled");
        }else if(operateId == ADD){
            $("#status").val("空闲");
        }else if(operateId == ADDMANY){
            $("#name1").text("起始编号");
            $("#id").attr("placeholder","起始编号")
            $("#name2").text("结束编号");
            $("#name").attr("placeholder","结束编号")
            $("#status").val("空闲");
        }
    }
    function addItem(){
        var row= getInputRow();
        if(row == false) return false;

        return addItemCommon(row,url);
    }

    function addManyItem() {
        var row={};
        row['from'] = $("#id").val();//起始编号
        row['to'] = $("#name").val();//结束编号
        row['status'] = $("#status").val();
        row['status'] = row['status']=="空闲"?0:(row['status']=="已租"?1:2);
        var result = LoadAjaxJson(row,"addMany",url);
        if(result['success']==false+""){
            alert("添加失败:"+result['context']);
            return false;
        }
        alert(result['context']);
        show(result.data);
        return true;
    }
    function updateItem(){
        var row= getInputRow();
        if(row == false) return false;
        return updateItemCommon(row,url);
    }
    function deleteItem() {
       return deleteItemCommon(url);
    }
    function getInputRow(){
        var numCells=[{'name':'id','type':1,'label':'衣柜编号'}];
        return getInputRowCommon(columns,numCells)
    }
    function search(key,value) {
        if(key=="status"&&(value!=null||value!=undefined||value!=""))
            value = value=="空闲"?0:(value=="已租"?1:2);
        if(key=="id"&&(value!=null&&value!=undefined&&value!="")&&
            !(/^[0-9]+$/.test(value))) {
            alert("会员编号无效！请重新输入")
            return false;
        }
        var row={};
        row['key'] = key;
        row['value'] = value;
        // console.log("row:"+row['key']+","+row['value'])
        var result = LoadAjaxJson(row,SEARCH,url);
        // console.log(result.data)
        $('#jqxGrid').jqxGrid('clear');
        //  传入json数组[{},{}]
        show(result.data)
    }
});