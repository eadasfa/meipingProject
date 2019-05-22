$(document).ready(function () {
    var url = "/systemSetting/card/operate";
    var sourceUrl = "/systemSetting/getCards";

    var columns = [
        { text: '编号', datafield: 'id', width: 200 },
        { text: '卡名', datafield: 'name', width: 200 },
        { text: '有效次数', datafield: 'youxiaoCishu', width: 180 },
        { text: '有效天数', datafield: 'youxiaoTianshu', width: 180, cellsalign: 'right' },
        { text: '价格', datafield: 'price', width: 180, cellsalign: 'right', cellsformat: 'c2' },
    ];
    setWidth(width,columns)
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'id' },
                    { name: 'name' },
                    { name: 'price' },
                    { name: 'youxiaoCishu' },
                    { name: 'youxiaoTianshu' }
                ],
            url:sourceUrl,
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
    $("#jqxGrid").jqxGrid(
        {
            // width: getWidth('Grid'),
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
            // showsortmenuitems: false,
            clipboard: false,//屏蔽jqx的复制功能
            enablebrowserselection: true,//允许使用浏览器选择内容功能

            source: dataAdapter,
            showtoolbar: true,
            //这里的返回值需要根绝实际情况作调整。
            // 如果params.data获取不到。可以用dataadapter来获取
            // 如dataadapter.recordids[0].*等
            rendertoolbar: function (toolbar) {
                //console.log(dataAdapter.recordids[0].name)
                //   var data = dataAdapter.recordids;
                //   console.log(data[0].name)
                //   var me = this;
                setToolBar();
                var container = $("<div style='margin: 5px;'></div>");
                toolbar.append(container);
                container.append('<input id="addrowbutton" type="button" value="增加" />');
                container.append('<input style="margin-left: 10px;" id="updaterowbutton" type="button" value="修改" />');
                container.append('<input style="margin-left: 10px;" id="deleterowbutton" type="button" value="删除" />');
                $("#addrowbutton").jqxButton();
                $("#deleterowbutton").jqxButton();
                $("#updaterowbutton").jqxButton();
                // update row.
                $("#updaterowbutton").on('click', function () {
                    Operate(UPDATE);
                });
                // create new row.
                $("#addrowbutton").on('click', function () {
                    Operate(ADD);
                });
                // delete row.
                $("#deleterowbutton").on('click', function () {
                    Operate(DELETE);
                });
            },
            columns:columns
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
        var title = "添加会员卡";
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
            title = "修改会员卡";
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
                initChildWindowBeforeOpen(operateId);
            }
        });
    }
    function initChildWindowBeforeOpen(operateId){
        if(operateId==UPDATE){
            var row = getSelectRow().rowdata
            //初始化弹出表单
            $("#id").val(row['id']);
            $("#name").val(row['name']);
            $("#youxiaoCishu").val(row['youxiaoCishu']);
            $("#youxiaoTianshu").val(row['youxiaoTianshu']);
            $("#price").val(row['price']);
            $("#id").attr("disabled","disabled");

        }
    }
    function addItem(){
        var row= getInputRow();
        if(row == false) return false;
        cardTypes.push(row)
        return addItemCommon(row,url);
    }
    function updateItem(){
        var row= getInputRow();
        if(row == false) return false;
        for(var i=0;i<cardTypes.length;i++){
            if(row.id==cardTypes[i].id){
                cardTypes[i] = row;
            }
        }
        return updateItemCommon(row,url);
    }
    function deleteItem() {
        var row = getSelectRow();

        for(var i=0;i<cardTypes.length;i++){
            if(cardTypes[i].id==row.id)
                cardTypes.splice(i,1);
                break;
        }

        return deleteItemCommon(url,row);
    }
    function getInputRow(){
        var numCells=[{'name':'id','type':1,'beNull':true,'label':'会员编号'},{'name':'youxiaoCishu','type':1,'label':'有效次数'},
            {'name':'youxiaoTianshu','type':1,'label':'有效天数'},{'name':'price','type':2,'label':'价格'}];
        return getInputRowCommon(columns,numCells)
    }

});